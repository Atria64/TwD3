//Saves options to chrome.storage
function save_options() {
    var deleteWindowEnabled = document.getElementById('deleteWindow').checked;
    chrome.storage.sync.set({
        deleteWindowEnabled: deleteWindowEnabled
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        'deleteWindowEnabled': false
    }, function(items) {
        document.getElementById('deleteWindow').checked = items.deleteWindowEnabled;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);