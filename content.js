chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "autofill") {
      const formData = request.data;
  
      if (formData && Object.keys(formData).length > 0) {
        for (const [key, value] of Object.entries(formData)) {
          const field = document.querySelector(`[name='${key}']`);
          if (field) {
            field.value = value;
          }
        }
      } else {
        console.log("No form data found");
      }
  
      sendResponse({ status: "completed" });
    }
  });
  