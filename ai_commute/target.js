chrome.runtime.sendMessage({todo: "showPageAction"});

var submitMingForm = (form) => {
    document.getElementsByClassName('sendbtn')[0].click();
    checkTargetMsg();
};

var saveMsg = () => {
    console.log('SaveMsg');
    console.log('targetMsg', targetMsg);
    if (lastTargetMsg != targetMsg) {
        chrome.runtime.sendMessage({
            turn: "bot",
            userMsg: lastTargetMsg
        });
        console.log(lastTargetMsg);
    } else {
        checkTargetMsg();
    };
};

var checkTargetMsg = () => {
    console.log('Waiting for reply');
    setTimeout(() => {
        targetMsg = req.userMsg;
        targetArray = document.getElementsByClassName('strangermsg');
        console.log(targetArray);
        if (targetArray.length != 0) {
            lastTargetMsg = targetArray[targetArray.length-1].lastChild.innerHTML;
            console.log('lastTargetMsg', lastTargetMsg);
            saveMsg();
        } else {
            lastTargetMsg = "Hello"; //Make it random
            console.log('lastTargetMsg', "else");
            saveMsg();
        };
        
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

var newBotMsg, mingForm, req, lastTargetMsg, targetMsg, targetArray; 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.turn == "target") {
        req = request;
        newBotMsg = request.botMsg;
        mingForm = document.getElementsByClassName('chatmsg')[0];
        giveCleverReply();
    }
});