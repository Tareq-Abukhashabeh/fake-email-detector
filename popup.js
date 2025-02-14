document.getElementById("scanEmail").addEventListener("click", () => {
    console.log("Button clicked! Sending message...");
    chrome.runtime.sendMessage({ action: "scan_email" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Message Error:", chrome.runtime.lastError.message);
            document.getElementById("result").textContent = "Error: Unable to scan email.";
        } else {
            console.log("Response received:", response);
            document.getElementById("result").textContent = response; 
        }
    });
});
