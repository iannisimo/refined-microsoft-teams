const crossPlatformBrowser = window.browser || window.msBrowser || window.chrome || browser || msBrowser || chrome;

crossPlatformBrowser.extension.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'getSettings') {
    sendResponse({
      '2-columns-enabled': localStorage.getItem('2-columns-enabled'),
    });
  }
});