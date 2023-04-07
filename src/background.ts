const RootContextID = "BQRootContext";

const initContextMenu = () => {
  console.log("initContextMenu");
  chrome.contextMenus.create({
    id: RootContextID,
    title: "Big Querer",
    type: "normal",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "ConvertTimestamp",
    title: "Convert Timestamp",
    type: "normal",
    contexts: ["all"],
    parentId: RootContextID,
  });

  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "ConvertTimestamp") {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => {
          tab && tab.id && chrome.tabs.sendMessage(
            tab.id,
            "convertTimeStamp",
            function (response) {
              // do something here if you want
            }
          );
        });
      });

      tab && tab.id && await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["js/content_script.js"],
      }) && chrome.tabs.sendMessage(tab.id, {
        action: "convertTimestamp"
      });
    }
  })
};


initContextMenu();
