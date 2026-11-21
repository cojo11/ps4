// Only one look in this hub: slim anthracite. The old layout and colour
// switches are gone from the settings popup; these functions stay as no-ops
// because jailbreak.js still calls loadLayout() and loadTheme().

function setLayout(theme) {
    return;
}

function setTheme(color) {
    return;
}

function loadLayout() {
    if (ui.initialScreen) ui.initialScreen.classList.remove('compact');
}

function loadTheme() {
    var colorSheet = document.getElementById('color-stylesheet');
    if (colorSheet) colorSheet.setAttribute('href', './includes/css/colors/default.css');
}
