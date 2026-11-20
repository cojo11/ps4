// Handling cache
// Caching is now handled by cache.html + iframe_cache.js for firmware based caching
// This way we dont cache just everything for everyone. faster caching.

window.addEventListener('load', function () {
    var isPS4User = isPS4Console();

    // Only go caching when this page really runs from the cache.
    // "UNCACHED" also happens when the page was cached a moment ago but this
    // fresh load has not claimed it yet - then redirecting would loop forever.
    var ac = window.applicationCache;
    var reallyUncached = !ac || ac.status === 0;
    if (isPS4User && reallyUncached && !devMode) {
        // Never bounce a second time in the same tab.
        var guard = null;
        try { guard = sessionStorage.getItem('hubCacheRedirect'); } catch (e) {}
        if (!guard) {
            try { sessionStorage.setItem('hubCacheRedirect', '1'); } catch (e) {}
            window.location.href = testModeUrl('./cache.html');
        }
    }
});

// Used if terminating cache process early
function terminateCache() {
    if (window.applicationCache) {
        // Status 3 is 'downloading', Status 1 is 'checking'
        if (window.applicationCache.status === 3 || window.applicationCache.status === 1) {
            console.log("Terminating cache process to save memory...");
            window.applicationCache.abort();
            var appTitle = (typeof projectName !== 'undefined') ? projectName : "Playstation Hub";
            document.title = appTitle;
            window.applicationCache.removeEventListener("progress", null);
            window.applicationCache.oncached = null;
            window.applicationCache.onupdateready = null;
        }
    }
}