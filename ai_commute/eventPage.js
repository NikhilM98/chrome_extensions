var userMsg = "testing", botMsg ="Hey";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ( request.todo == "showPageAction") {
        chrome.tabs.query(
            {active:true, currentWindow:true},
            tabs => chrome.pageAction.show(tabs[0].id)
        );
    };
    if ( request.turn == "bot" ) {
        userMsg = request.userMsg;
        chrome.tabs.query(
            {url: ["https://www.cleverbot.com/*"]},
            tabs => chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    turn: "bot",
                    userMsg,
                    botMsg
                }
            )
        );
    } else if ( request.turn == "target" ) {
        botMsg = request.botMsg;
        chrome.tabs.query(
            {url: ["https://www.omegle.com/*"]},
            tabs => chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    turn: "target",
                    userMsg,
                    botMsg
                }
            )
        );
    };
})
