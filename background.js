chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message);

    if (message.action === "scan_email") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0 || !tabs[0].id) {
                console.error("Error: No active tab found!");
                sendResponse("Error: No active tab found.");
                return;
            }

            let tabId = tabs[0].id;
            console.log("Executing scanEmail function on tab ID:", tabId);

            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: scanEmail
            }).then((result) => {
                console.log("Script execution result:", result);
                if (result && result[0] && result[0].result) {
                    sendResponse(result[0].result); 
                } else {
                    sendResponse("Error: No result received from script.");
                }
            }).catch((error) => {
                console.error("Error executing script:", error);
                sendResponse("Error scanning email.");
            });
        });

        return true; 
    }
});


function scanEmail() {
    console.log("Scanning email content...");
    let emailContent = document.body.innerText.toLowerCase();
    const phishingWords = ["urgent", "bank", "password", "verify", "limited time", "click here", "reset", "free"];
    let found = phishingWords.some(word => emailContent.includes(word));

    console.log("Scan completed.");
    return found ? "⚠️ Suspicious Email Detected!" : "✅ This email looks safe.";
}

