chrome.runtime.onInstalled.addListener(reason => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'splash.html',
    });
  }
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'openTab') {
    chrome.tabs.create({ url: 'newtab.html' });
  }
});
