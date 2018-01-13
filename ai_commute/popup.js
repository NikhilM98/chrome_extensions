$( () => {
    $('#btnStart').click(() => {
        var userMsg = "testing", botMsg ="Hey f19";
        $('#btnStart').attr("disabled", "disabled");
        // chrome.tabs.query(
        //     {url: ["https://www.cleverbot.com/*"]},
        //     tabs => chrome.tabs.sendMessage(tabs[0].id, {
        //         turn: "bot",
        //         userMsg,
        //         botMsg
        //     })
        // );
        chrome.tabs.query(
            {url: ["https://www.omegle.com/*"]},
            tabs => chrome.tabs.sendMessage(tabs[0].id, {
                turn: "target",
                userMsg,
                botMsg
            })
        );
    });
});
