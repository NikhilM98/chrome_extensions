const contextenuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextenuItem);

const isInt = (value) => !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));

chrome.contextMenus.onClicked.addListener( clickedData => {
    const selectionText = clickedData.selectionText;
    if (clickedData.menuItemId == "spendMoney" && selectionText) {
        if (isInt(selectionText)) {
            chrome.storage.sync.get(['limit', 'total'], budget => {
                let newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(selectionText);
                chrome.storage.sync.set({'total': newTotal}, () => {
                    if (newTotal >= budget.limit) {
                        const notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon48.png',
                            title: 'Limit Reached',
                            message: "The limit has been reached! Either increase your limit or reset your spendings."
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener((changes, storageName) => {
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});