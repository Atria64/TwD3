chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.tabs.query({}, tabs => {

            var TwitterWindowCounter = 0;
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].url === 'https://tweetdeck.twitter.com/') {
                    TwitterWindowCounter += 1;
                }
            }

            chrome.storage.sync.get(['banTweetDeckWindowEnabled', 'deleteWindowEnabled'], function(value) {
                var banTweetDeckWindowEnabled = value.banTweetDeckWindowEnabled;
                if (banTweetDeckWindowEnabled === true) {
                    chrome.tabs.query({ 'url': 'https://tweetdeck.twitter.com/' }, function(tab) {
                        for (let i = 0; i < TwitterWindowCounter; i++) {
                            chrome.tabs.remove(tab[i].id);
                        }
                    });
                    const options = {
                        iconUrl: 'icon.png',
                        type: 'list',
                        title: "TwD3",
                        message: '',
                        priority: 1,
                        items: [{
                            title: 'disabled',
                            message: chrome.i18n.getMessage('BanedTweetDeckWindow')
                        }]
                    };
                    let notificationId = "notification";
                    chrome.notifications.create(notificationId, options);
                    return;
                }

                var deleteWindowEnabled = value.deleteWindowEnabled;
                if (TwitterWindowCounter > 1) {
                    if (deleteWindowEnabled === true) {
                        //Deleting tabs when detected double TweetDeck window.
                        chrome.tabs.query({ 'url': 'https://tweetdeck.twitter.com/' }, function(tab) {
                            for (let i = 1; i < TwitterWindowCounter; i++) {
                                chrome.tabs.remove(tab[i].id);
                            }
                            chrome.tabs.update(tab[0].id, { active: true });
                        });
                    }
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
                }
            });


        });
        sendResponse({ returnValue: true });
    }
);
//notification_onclick
chrome.notifications.onClicked.addListener(
    function(notificationId) {
        chrome.tabs.query({}, tabs => {
            //Go to the first open TweetDeck window
            chrome.tabs.query({ "url": "https://tweetdeck.twitter.com/" }, function(tab) {
                if (tab.length > 0) chrome.tabs.update(tab[0].id, { active: true });
            });
        });
    }
)