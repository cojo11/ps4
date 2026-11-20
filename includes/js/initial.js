var autoJbInterval;
var lastScrollY = 0;
var lastSection = "initial";           // For custom snap scroll on the PS4
var projectName = "Playstation Hub";
var hideUnsupportedPayloads = false;
var commonMax = 14.02;                 // max supported paylaods

var user = {
  currentLanguage: storage.getString('language', 'en'),
  currentJbFlavor: storage.getString('jailbreakFlavor', DEFAULT_HEN),
  platform: "PS4",                                                          // PS4/PC/Mobile etc..
  lastTab: storage.getString('lastTab', 'tools'),
  advancedPayloads: storage.getBoolean('advancedPayloads', false),          // true/false
  ip: storage.getString('PayLoaderIp', window.location.hostname),
  ps4Fw: storage.getString('ps4Fw', null),                                  // Used for sending payload over network
  clearLog: true,
  exploitChain: storage.getNumber('exploitChain', null),                    // Exploit chain method
  blockJailbreak: false,                                                    // Prevent double jailbreak execution
};

var ui = {
  mainContainer: document.querySelector('.mainContainer'),

  // Sections
  initialScreen: document.getElementById('initial-screen'),
  exploitScreen: document.getElementById('exploit-main-screen'),

  // Initial screen elements
  settingsBtns: document.querySelectorAll(".settings-btn"),
  aboutBtns: document.querySelectorAll(".about-btn"),
  customizeBtns: document.querySelectorAll(".theme-btn"),
  ps4FwStatus: document.getElementById('PS4FW'),
  stopAutoJbBtn: document.getElementById('stopAutoJb'),
  updateCacheBtn: document.getElementById("updateCache"),

  // Exploit screen elements
  consoleElement: document.getElementById('console'),
  debugConsoleElement: document.getElementById('DebugConsole'),
  exploitState: document.getElementById('state'),
  toolsSection: document.getElementById('tools'),
  toolsTab: document.getElementById('tools-tab'),
  homebrewSection: document.getElementById("homebrew"),
  homebrewTab: document.getElementById("homebrew-tab"),
  linuxSection: document.getElementById('linux'),
  linuxTab: document.getElementById('linux-tab'),
  advancedPayloadsSection: document.getElementById('advanced'),
  advancedPayloadsTab: document.getElementById('advanced-tab'),
  advancedPayloadsContainer: document.getElementById('advancedPayloadsTab'),
  advancedPayloadsInput: document.getElementById('advancedPayloadsInput'),
  customPayloadsSection: document.getElementById('custom'),
  customPayloadsTab: document.getElementById('custom-tab'),
  customPayloadInput: document.getElementById('customPayloadInput'),
  sendCustomPayloadBtn: document.getElementById('sendCustomPayloadBtn'),
  successRateText: document.getElementById('successRate'),

  payloadsSection: document.getElementById('payloadsSection'),
  payloadsList: document.getElementById("payloadsGrid"),
  payloadsSectionTitle: document.getElementById('payloads-section-title'),
  exploitRunBtn: document.getElementById('exploitRun'),
  secondHostBtn: document.querySelectorAll('.secondHostBtn'),
  ps4IpInput: document.getElementById('ps4IpInput'),
  ps4FwSelect: document.getElementById('ps4FwSelect'),
  ps4IpRow: document.getElementById('ps4IpRow'),
  // Popups
  aboutPopupOverlay: document.getElementById('about-popup-overlay'),
  aboutPopup: document.getElementById('about-popup'),
  settingsPopupOverlay: document.getElementById('settings-popup-overlay'),
  settingsPopup: document.getElementById('settings-popup'),
  themePopupOverlay: document.getElementById('theme-popup-overlay'),
  themePopup: document.getElementById('theme-popup'),
  chooseFanThresholdOverlay: document.getElementById('choose-fanThreshold-overlay'),
  chooseFanThreshold: document.getElementById('choose-fanThreshold'),
  scanPayLoader: document.getElementById('scanPayLoader'),
  shutdownServerBtn: document.getElementById('shutdownServerBtn'),
  autoJbRetry: document.getElementById('autoJbRetry'),
  autoJb: document.getElementById('autoJb'),
  exploitChainTitle: document.getElementById('exploitChainTitle'),

  // Settings elements
  langRadios: document.querySelectorAll('#chooselang input[name="language"]'),
};
