// DOM event listeners and popup toggle functions.

// Scroll snap (PS4 only)
ui.mainContainer.addEventListener('scroll', function () {
    if (!isPS4Console() || !ui.initialScreen) return;

    if (ui.mainContainer.scrollTop > lastScrollY) {
        if (lastSection !== 'exploit') {
            document.getElementById('exploitContainer').scrollIntoView({ block: 'end' });
            lastSection = 'exploit';
        }
    } else if (ui.mainContainer.scrollTop < lastScrollY) {
        if (lastSection !== 'initial') {
            ui.initialScreen.scrollIntoView({ block: 'end' });
            lastSection = 'initial';
        }
    }
    lastScrollY = ui.mainContainer.scrollTop;
});

// Jailbreak launch (the play button is gone: the start page has its own)

ui.psLogoContainer.addEventListener('click', function () {
    if (user.blockJailbreak) return;
    user.blockJailbreak = true;
    chooseHEN();
    jailbreak();
});

// Payload tabs are gone: this hub only runs the jailbreak, no payload cards.
// The functions below stay as harmless stubs because other files still call them.
var TAB_SECTIONS = {};
var TAB_BUTTONS = {};

function switchTab(tabName) {
    return;
}

// PS4 firmware manual selector (local-server / phone mode)
ui.ps4FwSelect.addEventListener('change', function () {
    user.ps4Fw = ui.ps4FwSelect.value;
    storage.set('ps4Fw', ui.ps4FwSelect.value);
    ui.ps4FwSelect.style.border = '1px solid white';
    if (typeof CheckFW === 'function') CheckFW();
});

// Auto-jailbreak/Auto-jailbreak retry stop button
ui.stopAutoJbBtn.addEventListener('click', function () {
    clearInterval(autoJbInterval);

    storage.session.set('autoJbRetry', false);
    storage.session.set('autoJb', false);

    toggleVisibility(ui.stopAutoJbBtn.id);
    var currentTheme = storage.getString('theme', 'index');
    if (currentTheme === 'compact') {
        ui.clickToStartText.textContent = projectName;
    } else {
        ui.clickToStartText.textContent = (window.lang && window.lang.clickToStart) || 'Click to Start';
    }
});

ui.debugConsoleElement.addEventListener('click', function () {
    ui.consoleElement.innerHTML = '<center>' + (window.lang && window.lang.waitingUserInput) || 'Waiting for user action...' + '</center>';
});

// Offline-cache button (lives in the settings popup)
if (ui.updateCacheBtn) {
    ui.updateCacheBtn.addEventListener('click', function () {
        window.location.href = './cache.html';
    });
}

// Popup toggles
function aboutPopup() {
    toggleVisibility(ui.aboutPopupOverlay.id);
}

function settingsPopup() {
    toggleVisibility(ui.settingsPopupOverlay.id);
}

function themePopup() {
    toggleVisibility(ui.themePopupOverlay.id);
}

function chooseFanThreshold() {
    // Fan threshold payload was removed from this hub.
    return;
}

// Settings handlers
function loadAdvancedPayloads() {
    // Advanced payload tab removed - nothing to toggle.
    return;
}

// select exploit option when loading the page
function loadExploitChain() {
    var radioElement = document.querySelector('input[name="exploitChain"][value="' + user.exploitChain + '"]');
    if (radioElement) {
        radioElement.checked = true;
    }
}

// Saves exploit chain choice to storage and updates user state
function exploitChain(value) {
    storage.set('exploitChain', value);
    user.exploitChain = parseFloat(value);
    if (ui.exploitChainLabel){
        if (storage.getString('theme') == 'compact'){
            ui.clickToStartText.textContent = getChainLabel(user.exploitChain);
        } else ui.exploitChainLabel.textContent = getChainLabel(value);
    }
}

function updateBareboneJB() {
    if (ui.bareboneJBInput) {
        ui.bareboneJBInput.checked = user.bareboneJB;
    }
}

function setBareboneJB(checked) {
    storage.set('bareboneJB', checked);
    user.bareboneJB = checked;
}

function clearStats() {
    if (!confirm(window.lang.clearStatsConfirm)) return;
    storage.remove('jbTotal');
    storage.remove('jbSuccess');
    updateJbStats(0, 0)
}

// To be only used when this project is served on a PS4-Websrv payload on a PS4.
// Send shutdown request to the server
function shutdownServer() {
    if (!confirm(window.lang.shutdownServerConfirm)) return;

    fetch('/shutdown')
        .then(function () {
            alert('Server is shutting down. The page will now reload.');
            window.location.reload();
        })
        .catch(function () {
            alert('Server stopped? (connection lost).');
            window.location.reload();
        });
}
// Big "Run Jailbreak" button on the start page.
// It does exactly what clicking the PS logo did: pick the saved HEN flavor and
// start the exploit chain.
function startHubJailbreak() {
    if (user.blockJailbreak) return;
    user.blockJailbreak = true;

    // Give the user a sign that the click arrived. The chain loads its script
    // first, which takes a moment on the PS4 - without this the button looks dead.
    var btn = document.getElementById('hubJailbreakBtn');
    if (btn) {
        btn.disabled = true;
        btn.className = 'hub-jb-btn hub-jb-running';
        var lbl = document.getElementById('hubJbLabel');
        if (lbl) lbl.innerHTML = 'Starting...';
    }
    if (typeof log === 'function') log('Starting jailbreak...');

    // Jump to the log so you can watch the chain and see where it gets stuck.
    var logBox = document.getElementById('DebugConsole');
    if (logBox) {
        setTimeout(function () {
            try { logBox.scrollIntoView({ block: 'start' }); } catch (e) { }
        }, 150);
    }

    chooseHEN();
    jailbreak();
}


// ---- Status dot on the jailbreak button ----------------------------------
// The chain sets body.className to "done" or "fail" when it finishes.
// Watch that and show the result on the button itself.
(function () {
    var lastState = '';

    function setDot(state) {
        if (state === lastState) return;
        lastState = state;
        var btn = document.getElementById('hubJailbreakBtn');
        if (!btn) return;

        var back = document.getElementById('hubReloadBtn');
        if (back && state !== 'idle') back.classList.remove('hidden');

        var lbl = document.getElementById('hubJbLabel');
        if (state === 'done') {
            if (lbl) lbl.innerHTML = 'Jailbroken';
            btn.className = 'hub-jb-btn hub-jb-ok';
        } else if (state === 'fail') {
            if (lbl) lbl.innerHTML = 'Failed - Retry';
            btn.className = 'hub-jb-btn hub-jb-fail';
            btn.disabled = false;
        } else {
            if (lbl) lbl.innerHTML = 'Run Jailbreak';
            btn.className = 'hub-jb-btn';
            btn.disabled = false;
        }
    }

    function check() {
        var cls = document.body.className || '';
        if (cls.indexOf('done') !== -1) setDot('done');
        else if (cls.indexOf('fail') !== -1) setDot('fail');
        else setDot('idle');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setDot('idle');
            setInterval(check, 500);
        });
    } else {
        setDot('idle');
        setInterval(check, 500);
    }
})();
