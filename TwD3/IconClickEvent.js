chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({}, tabs => {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].url === 'https://tweetdeck.twitter.com/') {
                //Activate an existing TweetDeck window.
                chrome.tabs.update(tabs[i].id, { active: true });

                //notification
                const options = {
                    iconUrl: 'icon.png',
                    type: 'list',
                    title: "TwD3",
                    message: '',
                    priority: 1,
                    items: [{
                        title: 'Already opened',
                        message: chrome.i18n.getMessage('quickAccessCauseDoubleWindow')
                    }]
                };
                let notificationId = "TwD3";
                //Refresh the notification after 5 seconds. issue #14
                chrome.notifications.create(notificationId, options, (notificationId) => {
                    setTimeout(function() {
                        chrome.notifications.clear(notificationId, (wasCleared) => {
                            console.log(wasCleared);
                        });
                    }, 5000);
                });
                return;
            }
        }
        chrome.tabs.create({ url: "https://tweetdeck.twitter.com/" });
    });
});