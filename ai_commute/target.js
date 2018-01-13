chrome.runtime.sendMessage({todo: "showPageAction"});

var submitMingForm = (form) => {
    document.getElementsByClassName('sendbtn')[0].click();
    checkTargetMsg();
};

var checkTargetMsg = () => {
    console.log('Waiting for reply');
    setTimeout(() => {
        var targetMsg = req.userMsg;
        var targetArray = document.getElementsByClassName('strangermsg');
        if (targetArray.length != 0) {
            var lastTargetMsg = targetArray[targetArray.length-1].lastChild.innerHTML;
        } else {
            var lastTargetMsg = "";
        }
        if (lastTargetMsg != targetMsg) {
            chrome.runtime.sendMessage({
                turn: "bot",
                userMsg: lastTargetMsg
            });
            console.log(lastTargetMsg);
        }
    }, 100);
}

var giveCleverReply = () => {
    console.log('giveCleverReply');
    var botArray = document.getElementsByClassName('youmsg');
    console.log(botArray);
    if (botArray.length != 0) {
        var lastBotMsg = botArray[botArray.length-1].lastChild.innerHTML;
        console.log('here');
    } else {
        var lastBotMsg = ""
        console.log('there');
    }
    console.log(lastBotMsg, newBotMsg)
    if (lastBotMsg != newBotMsg) {
        console.log('Sending botMsg...');
        mingForm.value=newBotMsg;
        submitMingForm(mingForm);
    }
};

var newBotMsg, mingForm, req; 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.turn == "target") {
        req = request;
        newBotMsg = request.botMsg;
        mingForm = document.getElementsByClassName('chatmsg')[0];
        giveCleverReply();
    }
});