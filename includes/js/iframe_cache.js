// iframe_cache.js
// Runs inside each cacheXXX.html iframe and relays AppCache events to cache.html.
// AppCache has no error details, so we resolve every manifest entry ourselves and
// report exactly which files the browser cannot cache.
(function () {
    var appCache = window.applicationCache;
    var manifestUrl = '';

    // --- welche Dateien stehen im Manifest? (relative zum Manifest selbst) ---
    function readManifest(url, done) {
        var xhr = new XMLHttpRequest();
        try {
            xhr.open('GET', url, true);
        } catch (e) {
            done(null);
            return;
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) { done(null); return; }

            var lines = xhr.responseText.split(/\r?\n/);
            var base = url.substring(0, url.lastIndexOf('/') + 1);
            var out = [];
            for (var i = 0; i < lines.length; i++) {
                var raw = lines[i].replace(/^\s+|\s+$/g, '');
                if (!raw || raw.charAt(0) === '#' || raw === 'CACHE:') continue;
                if (raw === 'NETWORK:' || raw === 'FALLBACK:' || raw === '*') break;
                out.push(base + raw);
            }
            done(out);
        };
        xhr.send(null);
    }

    // --- Datei einzeln pruefen (HEAD, bei alten Servern GET) ---
    function probe(url, done) {
        var xhr = new XMLHttpRequest();
        var finished = false;
        function finish(ok, status) {
            if (finished) return;
            finished = true;
            done(ok, status);
        }
        try {
            xhr.open('GET', url, true);
        } catch (e) {
            finish(false, 'not reachable');
            return;
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            finish((xhr.status >= 200 && xhr.status < 400), xhr.status);
        };
        try { xhr.send(null); } catch (e) { finish(false, 'not reachable'); }
    }

    function checkAllDone() {}

    function diagnose(done) {
        if (!manifestUrl) { done(-1, []); return; }

        readManifest(manifestUrl, function (entries) {
            if (!entries) { done(-1, []); return; }

            var broken = [];
            var pending = entries.length;
            if (!pending) { done(0, []); return; }

            // in kleinen Wellen pruefen, damit die PS4 nicht ueberlastet wird
            var index = 0;
            function nextBatch() {
                if (index >= entries.length) {
                    done(broken.length, broken);
                    return;
                }
                var batch = entries.slice(index, index + 6);
                index += 6;
                var left = batch.length;
                for (var i = 0; i < batch.length; i++) {
                    (function (url) {
                        probe(url, function (ok, status) {
                            if (!ok) {
                                var shown = url;
                                if (shown.indexOf('../../../') === 0) shown = shown.substring(9);
                                broken.push(shown + '  (HTTP ' + status + ')');
                            }
                            left--;
                            if (left === 0) nextBatch();
                        });
                    })(batch[i]);
                }
            }
            nextBatch();
        });
    }

    if (!appCache) {
        window.parent.postMessage({ type: 'CACHE_ERROR', reason: 'applicationCache not supported by this browser' }, '*');
        return;
    }

    try {
        var script = document.querySelector('script[src*="iframe_cache"]');
        var html = document.documentElement;
        var man = html ? html.getAttribute('manifest') : '';
        if (man) {
            manifestUrl = man;
            if (manifestUrl.indexOf('http') !== 0) {
                var page = window.location.href.split('#')[0];
                manifestUrl = page.substring(0, page.lastIndexOf('/') + 1) + manifestUrl;
            }
        }
    } catch (e) {}

    appCache.addEventListener('checking', function () {
        window.parent.postMessage({ type: 'CACHE_CHECKING' }, '*');
    }, false);

    appCache.addEventListener('downloading', function () {
        window.parent.postMessage({ type: 'CACHE_DOWNLOADING' }, '*');
    }, false);

    appCache.addEventListener('progress', function (e) {
        var percent = e.lengthComputable ? Math.round((e.loaded / e.total) * 100) : -1;
        window.parent.postMessage({ type: 'CACHE_PROGRESS', percent: percent, loaded: e.loaded, total: e.total }, '*');
    }, false);

    appCache.addEventListener('cached', function () {
        window.parent.postMessage({ type: 'CACHE_COMPLETE' }, '*');
    }, false);

    appCache.addEventListener('noupdate', function () {
        window.parent.postMessage({ type: 'CACHE_EXISTS' }, '*');
    }, false);

    appCache.addEventListener('updateready', function () {
        try { appCache.swapCache(); } catch (e) {}
        window.parent.postMessage({ type: 'CACHE_COMPLETE' }, '*');
    }, false);

    appCache.addEventListener('obsolete', function () {
        window.parent.postMessage({ type: 'CACHE_ERROR', reason: 'The manifest is no longer used (HTTP status 404/410).' }, '*');
    }, false);

    appCache.addEventListener('error', function () {
        var status = appCache.status;
        var statusNames = ['UNCACHED', 'IDLE', 'CHECKING', 'DOWNLOADING', 'UPDATEREADY', 'OBSOLETE'];
        var statusName = statusNames[status] || ('status=' + status);

        // Der Browser verraet nicht, welche Datei schuld ist - also selbst pruefen.
        window.parent.postMessage({
            type: 'CACHE_DIAGNOSING',
            reason: statusName
        }, '*');

        diagnose(function (brokenCount, broken) {
            window.parent.postMessage({
                type: 'CACHE_ERROR',
                reason: 'AppCache error (status: ' + statusName + '). ' +
                        (brokenCount < 0
                            ? 'The manifest itself could not be loaded: ' + manifestUrl
                            : brokenCount + ' file(s) are not reachable.') ,
                broken: broken
            }, '*');
        });
    }, false);
})();
