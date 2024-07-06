chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
  });
  
  // Listen for messages from the content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fillForm") {
      chrome.storage.sync.get(["formData"], (result) => {
        sendResponse(result.formData || {});
      });
      return true; // Keep the message channel open for sendResponse
    }
  });
  