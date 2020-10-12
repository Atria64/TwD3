document.getElementById('save').addEventListener('click', save_options);
//Saves options to chrome.storage
function save_options() {
    var autoCloseWindowEnabled = document.getElementById('autoCloseWindow').checked;
    var blockTweetDeckWindowEnabled = document.getElementById('blockTweetDeckWindow').checked;
    chrome.storage.sync.set({
        autoCloseWindowEnabled: autoCloseWindowEnabled,
        blockTweetDeckWindowEnabled: blockTweetDeckWindowEnabled
    }, function() {
        //Update -> <div id="status"></div>
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
//Restore options from chrome.storage
function restore_options() {
    chrome.storage.sync.get({
        'autoCloseWindowEnabled': false,
        'blockTweetDeckWindowEnabled': false
    }, function(items) {
        document.getElementById('autoCloseWindow').checked = items.autoCloseWindowEnabled;
        document.getElementById('blockTweetDeckWindow').checked = items.blockTweetDeckWindowEnabled;
    });
}