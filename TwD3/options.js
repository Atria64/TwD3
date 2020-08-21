document.getElementById('save').addEventListener('click', save_options);
//Saves options to chrome.storage
function save_options() {
    var deleteWindowEnabled = document.getElementById('deleteWindow').checked;
    var banTweetDeckWindowEnabled = document.getElementById('banTweetDeckWindow').checked;
    chrome.storage.sync.set({
        deleteWindowEnabled: deleteWindowEnabled,
        banTweetDeckWindowEnabled: banTweetDeckWindowEnabled
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
        'deleteWindowEnabled': false,
        'banTweetDeckWindowEnabled': false
    }, function(items) {
        document.getElementById('deleteWindow').checked = items.deleteWindowEnabled;
        document.getElementById('banTweetDeckWindow').checked = items.banTweetDeckWindowEnabled;
    });
}