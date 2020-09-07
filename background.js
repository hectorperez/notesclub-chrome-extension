var selectedId = -1;
function refreshCounter() {
  chrome.tabs.query({lastFocusedWindow: true, active: true}, function (tabs) {
    const url = tabs[0].url;
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
