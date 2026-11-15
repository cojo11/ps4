function setLayout(theme) {
    var styleSheet = document.getElementById('main-stylesheet');
    if (styleSheet) {
        // Playstation Hub has exactly one layout now (includes/css/layouts/index.css).
        // Keep the stylesheet pinned so a stale saved value cannot blank the page.
        styleSheet.setAttribute('href', './includes/css/layouts/index.css');
        storage.set('theme', 'index');

        if (ui.initialScreen) ui.initialScreen.classList.remove('compact');
    }
}

function setTheme(color) {
    // Only one color scheme (anthracite) is shipped. Keep the function so that
    // stored/old calls do not throw, but never swap the stylesheet.
    storage.set('color', 'default');
}

function loadLayout() {
    // Single anthracite layout: make sure the right stylesheet is active and
    // drop a stale "compact" class from an older version.
    var styleSheet = document.getElementById('main-stylesheet');
    if (styleSheet) styleSheet.setAttribute('href', './includes/css/layouts/index.css');
    storage.set('theme', 'index');

    if (ui.initialScreen) ui.initialScreen.classList.remove('compact');
}

function loadTheme() {
    // Colors are part of the anthracite layout; keep the hook so the color
    // radio group (if ever re-added) cannot break start-up.
    storage.set('color', 'default');
}
