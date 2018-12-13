//open popup on new tab after new install
chrome.runtime.onInstalled.addListener(details => {
    switch(details.reason) {
        case 'install':
            chrome.tabs.create({
              url:chrome.extension.getURL('popup.html')
            }, tab => null);
      break;
    case 'update':
      break;
  }
});

//activate popup view with action_page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'activate_icon') {
        chrome.pageAction.show(sender.tab.id);
    }
});
