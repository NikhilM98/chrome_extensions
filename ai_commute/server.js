chrome.runtime.sendMessage({todo: "showPageAction"});

var submitCleverbot = (form) => {
    console.log('submitCleverbot');
    var button = form.ownerDocument.createElement('input');
    button.style.display = 'none';
    button.type = 'submit';
    form.appendChild(button).click();
    form.removeChild(button);
    checkBotMsg();
};

var checkBotMsg = () => {
    console.log('checkBotMsg');
    setTimeout(() => {
        var botMsg = req.botMsg;
        var botArray = document.getElementsByClassName('bot');
        var lastBotMsg = botArray[botArray.length-1].innerHTML;
        if (lastBotMsg != botMsg && lastBotMsg != '&nbsp;') {
            setTimeout(() => {
                var botArray = document.getElementsByClassName('bot');
                var lastBotMsg = botArray[botArray.length-1].innerHTML;
                chrome.runtime.sendMessage({
                    turn: 'target',
                    botMsg: lastBotMsg
                });
                console.log(lastBotMsg);
            }, 8000);
        } else {
            checkBotMsg();
        }
    }, 100);
}

var getCleverReply = () => {
    console.log('getCleverReply');
    var userArray = document.getElementsByClassName('user');
    var lastUserMsg = userArray[userArray.length-1].innerHTML;
    if (lastUserMsg != newUserMsg && lastUserMsg != '&nbsp;') {
        console.log('Getting New Clever Reply...');
        cleverForm.firstChild.value=newUserMsg;
        submitCleverbot(cleverForm);
    }
};

var newUserMsg, cleverForm, req; 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.turn == "bot") {
        req = request;
        newUserMsg = request.userMsg;
        console.log(newUserMsg);
        cleverForm = document.getElementById('avatarform');
        console.log(cleverForm);
        getCleverReply();
    }
});