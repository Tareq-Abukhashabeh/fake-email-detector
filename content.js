chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extract_email") {
        let emailText = document.body.innerText;
        sendResponse({ email: emailText });
    }
});

