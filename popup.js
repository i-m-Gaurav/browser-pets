document.getElementById('addCat').addEventListener('click', () => {
    // Send a message to content.js to add a cat
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "addCat"});
    });
  });
  
  // Similar logic for removeCat