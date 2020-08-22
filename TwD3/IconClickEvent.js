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
                        title: 'detected',
                        message: chrome.i18n.getMessage('MultipleTweetDeckWindow')
                    }]
                };
                let notificationId = "notification";
                chrome.notifications.create(notificationId, options);
                return;
            }
        }
        chrome.tabs.create({ url: "https://tweetdeck.twitter.com/" });
    });
});