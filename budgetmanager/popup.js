
$(() => {
    chrome.storage.sync.get('total', budget => {
        if(budget.total) {
            $('#totalSpent').text(budget.total);
        }
    })
    $('#spendAmount').click(() => {
        chrome.storage.sync.get('total', budget => {
            let newTotal = 0;
            if(budget.total) {
                newTotal += parseInt(budget.total);
            }
            const amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({'total': newTotal});
            $('#totalSpent').text(newTotal);
            $('#amount').val('');
        })
    })
});