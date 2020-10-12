chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.tabs.query({}, tabs => {

            var TwitterWindowCounter = 0;
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].url === 'https://tweetdeck.twitter.com/') {
                    TwitterWindowCounter += 1;
                }
            }

            chrome.storage.sync.get(['blockTweetDeckWindowEnabled', 'autoCloseWindowEnabled'], function(value) {
                var blockTweetDeckWindowEnabled = value.blockTweetDeckWindowEnabled;
                if (blockTweetDeckWindowEnabled === true) {
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
                            title: 'blocked',
                            message: chrome.i18n.getMessage('blockTweetDeckWindow')
                        }]
                    };
                    let notificationId = "TwD3";
                    chrome.notifications.create(notificationId, options, (notificationId) => {
                        setTimeout(function() {
                            chrome.notifications.clear(notificationId, (wasCleared) => {
                                console.log(wasCleared);
                            });
                        }, 5000);
                    });
                    return;
                }

                var autoCloseWindowEnabled = value.autoCloseWindowEnabled;
                if (TwitterWindowCounter > 1) {
                    if (autoCloseWindowEnabled === true) {
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
                    let notificationId = "TwD3";
                    //Refresh the notification after 5 seconds. issue #14
                    chrome.notifications.create(notificationId, options, (notificationId) => {
                        setTimeout(function() {
                            chrome.notifications.clear(notificationId, (wasCleared) => {
                                console.log(wasCleared);
                            });
                        }, 5000);
                    });
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