let selectedId = -1;
let url = ""
function refreshCounter() {
  chrome.tabs.query({lastFocusedWindow: true, active: true}, function (tabs) {
    url = tabs[0].url;
    url = url.replace(/\/$/, '');
    fetch(`https://935f3a7d7cf4.ngrok.io/v1/search/count?url=${url}`).then(r => r.text()).then(result => {
      chrome.browserAction.setBadgeText({ "text": result, tabId: selectedId });
    })
  });
}

chrome.tabs.onUpdated.addListener(function (tabId, props) {
  if (props.status == "loading" && tabId == selectedId)
    refreshCounter();
});

chrome.tabs.onSelectionChanged.addListener(function (tabId, props) {
  selectedId = tabId;
  refreshCounter();
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  selectedId = tabs[0].id;
  refreshCounter();
});

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({ 'url': `http://hec.localhost.hec:3001/topic/${parameterize(url, 100)}?content=${url}` })
});
