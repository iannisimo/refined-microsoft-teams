const crossPlatformBrowser = window.browser || window.msBrowser || window.chrome || browser || msBrowser || chrome;

crossPlatformBrowser.extension.sendMessage({
  type: 'getSettings',
}, function (settings) {
  if (settings['2-columns-enabled'] != 'no')
    $('body').addClass('refined-microsoft-teams-2-columns')
});

function loadJS(path) {
  var s = document.createElement('script');
  s.src = crossPlatformBrowser.runtime.getURL(path);
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

loadJS('scripts/multitenant-panel.js');
loadJS('scripts/bulk-add-team-members.js');