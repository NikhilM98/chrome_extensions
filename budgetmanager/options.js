
$(() => {
    chrome.storage.sync.get('limit', budget =>  {
        $('#limit').val(budget.limit);
    })
    $('#saveLimit').click(() => {
        const limit = parseInt($('#limit').val());
        if (limit) {
            chrome.storage.sync.set({'limit': limit}, () => close());
        }
    });
    $('#resetTotal').click(() => {
        chrome.storage.sync.set({'total': 0}, () => {
            const notifOptions = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Total Reset!',
                message: "The total spendings have been reset to zero."
            };
            chrome.notifications.create('limitNotif', notifOptions);
        });
    });
});