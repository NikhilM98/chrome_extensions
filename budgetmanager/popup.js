
$(() => {
    chrome.storage.sync.get(['total', 'limit'], budget => {
        if(budget.total) {
            $('#totalSpent').text(budget.total);
        }
        if(budget.limit) {
            $('#limit').text(budget.limit);
        }
    })
    $('#spendAmount').click(() => {
        chrome.storage.sync.get(['total', 'limit'], budget => {
            let newTotal = 0;
            if(budget.total) {
                newTotal += parseInt(budget.total);
            }
            const amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({'total': newTotal}, () => {
                console.log('hi');
                console.log(amount);
                console.log(newTotal);
                console.log(budget);
                
                if (amount && newTotal >= budget.limit) {
                    const notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit Reached',
                        message: "The limit has been reached! Either increase your limit or reset your spendings."
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });
            $('#totalSpent').text(newTotal);
            $('#amount').val('');
        })
    })
});