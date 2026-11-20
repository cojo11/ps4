// Handles payload tab loading, rendering, and dispatching.
// payloads tabs
function loadLastTab() {
    // No payload tabs any more - nothing to restore.
    if (!ui.toolsSection && !ui.homebrewSection && !ui.linuxSection &&
        !ui.advancedPayloadsSection) return;
    if (user.lastTab == "advanced" && !user.advancedPayloads) {
        // set last tab to tools
        user.lastTab = "tools";
        if (ui.toolsSection) ui.toolsSection.click();
    }
    var targetEl = document.getElementById(user.lastTab);
    if (targetEl) toggleVisibility(targetEl.id, 1);
    var tabEl = document.getElementById(user.lastTab + '-tab');
    if (tabEl) tabEl.setAttribute("aria-selected", "true");
}

function saveLastTab(tab) {
    // Update state
    user.lastTab = tab;
    storage.set('lastTab', tab);

    // Define the map of containers
    var sections = {
        'tools': ui.toolsSection,
        'homebrew': ui.homebrewSection,
        'linux': ui.linuxSection,
        'advanced': ui.advancedPayloadsSection,
        'custom': ui.customPayloadsSection
    };

    // Nuke contents of every section but the active one and custom to free memory
    for (var key in sections) {
        if (sections.hasOwnProperty(key)) {
            if (key !== tab && sections[key] && key !== 'custom') {
                sections[key].innerHTML = '';
            }
        }
    }
}

function Loadpayloads(payload) {
    if (payload.id == "FanThreshold") {
        chooseFanThreshold();
        return;
    }
    if (!isPS4Console()) {
        var inputIp = ui.ps4IpInput ? ui.ps4IpInput.value.trim() : "";
        if (!inputIp || /\s/.test(inputIp)) {
            alert((window.lang && window.lang.ps4IpInvalid) || 'Invalid PS4 IP address');
            return;
        }

        if (user.ps4Fw == null || user.ps4Fw == 'undefined') {
            if (ui.ps4FwSelect) ui.ps4FwSelect.style.border = "2px solid red";
            return;
        }
        user.ip = inputIp;
    }
    try {
        storage.session.remove('binloader');
        
        if (payload.id == undefined) {
            var payloadFile = ui.customPayloadInput ? ui.customPayloadInput.files[0] : null;
            if (!payloadFile) return;
            customPayload(payloadFile);
        } else {
            payloadRouter(payload);
        }

    } catch (e) {
        alert('Failed to load payload: ' + payload.name + ' | Error: ' + e);
    }
}

function loadFanThreshold(temperature) {
    var supportedTemperatures = {
        "60": true,
        "70": true,
        "80": true,
        "85": true
    };

    if (!Object.prototype.hasOwnProperty.call(supportedTemperatures, temperature)) {
        alert('Invalid fan threshold selection.');
        return;
    }

    if (ui.chooseFanThresholdOverlay) toggleVisibility(ui.chooseFanThresholdOverlay.id, false);
    Loadpayloads({
        id: 'FanThreshold' + temperature,
        name: 'Fan Threshold (' + temperature + '°C)',
        specificFW: '4.73 - latest',
        src: payloadsPath + 'fan-thresholds/ps4-fan-threshold' + temperature + '.bin'
    });
}

function renderPayloads(payloads) {
    if (!payloads || !payloads.length) return;

    // Playstation Hub shows the jailbreak only: the payload tabs (Tools,
    // Homebrew, Linux, Advanced, Custom) are gone, so there is no container to
    // render into. Leave early instead of writing into a missing element.
    var anyContainer = ui.toolsSection || ui.homebrewSection || ui.linuxSection ||
        ui.advancedPayloadsSection;
    if (!anyContainer) return;

    // Identify the target container
    var firstCategory = payloads[0].category;
    var targetContainer;

    if (firstCategory === 'tools') targetContainer = ui.toolsSection;
    else if (firstCategory === 'homebrew') targetContainer = ui.homebrewSection;
    else if (firstCategory === 'linux') targetContainer = ui.linuxSection;
    else if (firstCategory === 'advanced') targetContainer = ui.advancedPayloadsSection;

    // Clear previous elements to avoid duplication
    if (targetContainer) targetContainer.innerHTML = '';

    for (var i = 0; i < payloads.length; i++) {
        (function (payload) {
            // hide unsupported payloads
            if (hideUnsupportedPayloads) {
                if (typeof user !== 'undefined' && user.ps4Fw) {
                    if (!isPayloadSupported(payload)) {
                        console.log(payload.name + " is not supported on firmware " + user.ps4Fw)
                        return; // Skip rendering this card
                    }
                }
            }

            var payloadCard = document.createElement('div');
            payloadCard.id = payload.id;
            payloadCard.onclick = function () {
                Loadpayloads(payload);
            };
            payloadCard.className = 'payload payload-card';
            payloadCard.dataset.payloadId = payload.id;

            var cardTitle = document.createElement('h3');
            cardTitle.textContent = payload.name;

            var cardAuthor = document.createElement('p');
            cardAuthor.className = 'payload-author';
            cardAuthor.textContent = payload.author || '';

            var cardDescription = document.createElement('p');
            cardDescription.textContent = payload.description || '';

            var cardCategory = document.createElement('span');
            cardCategory.className = 'payload-category ' + getPayloadCategoryClass(payload.category);
            cardCategory.textContent = payload.category;

            payloadCard.appendChild(cardTitle);
            if (payload.author) payloadCard.appendChild(cardAuthor);
            if (payload.description) payloadCard.appendChild(cardDescription);
            payloadCard.appendChild(cardCategory);

            if (payload.specificFW) {
                var cardFw = document.createElement('p');
                cardFw.className = 'payload-fw';
                cardFw.textContent = payload.specificFW;
                payloadCard.appendChild(cardFw);
            }

            switch (payload.category) {
                case "tools":
                    if (ui.toolsSection) ui.toolsSection.appendChild(payloadCard);
                    break;
                case "homebrew":
                    if (ui.homebrewSection) ui.homebrewSection.appendChild(payloadCard);
                    break;
                case "linux":
                    if (ui.linuxSection) ui.linuxSection.appendChild(payloadCard);
                    break;
                case "advanced":
                    if (ui.advancedPayloadsSection) ui.advancedPayloadsSection.appendChild(payloadCard);
                    break;
                default:
                    if (ui.toolsSection) ui.toolsSection.appendChild(payloadCard);
                    break;
            }
        })(payloads[i]);
    }
}

function loadAdvancedPayloads() {
    if (user.advancedPayloads) {
        // its true, check the box, show tab and load the payloads
        if (ui.advancedPayloadsInput) ui.advancedPayloadsInput.checked = true;
        if (ui.advancedPayloadsContainer) toggleVisibility(ui.advancedPayloadsContainer.id, 1);
        var advancedTab = document.getElementById('advanced-tab');
        if (advancedTab) toggleVisibility(advancedTab.id, 1);
        var advancedPayloads = [];
        if (typeof payloadsList !== 'undefined') {
            for (var i = 0; i < payloadsList.length; i++) {
                if (payloadsList[i].category === 'advanced') {
                    advancedPayloads.push(payloadsList[i]);
                }
            }
        }
        renderPayloads(advancedPayloads);
    }
}

function getPayloadCategoryClass(category) {
    return 'category-' + (category || 'other');
}

/**
 * Checks if userFW is supported according to payload.specificFW string.
 * Works with rules like: "5.05, 7.00 - 8.50, 9.00 - latest"
 */
function isPayloadSupported(payload) {
    var userFW = parseFloat(getPs4FwVersion() || user.ps4Fw);
    if (!userFW) return false;

    // If payload has explicit specificFW string
    if (!payload.specificFW || payload.specificFW.trim() == "") return true;
    // Replace 'latest' with max firmware supported
    var rawStr = payload.specificFW.replace(/latest/gi, commonMax);
    var rules = rawStr.split(',');

    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i].trim();

        if (rule.indexOf('-') !== -1) {
            // Range: "9.00 - 14.00"
            var parts = rule.split('-');
            var minVal = parseFloat(parts[0]);
            var maxVal = parseFloat(parts[1]);

            if (userFW >= minVal && userFW <= maxVal) {
                return true;
            }
        } else {
            // Single match: "5.05"
            if (userFW == parseFloat(rule)) {
                return true;
            }
        }
    }
    return false;
}