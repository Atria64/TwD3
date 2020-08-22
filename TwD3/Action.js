//SendMessage just for calling chrome.*
chrome.runtime.sendMessage({ Value: 'Value' }, function(response) {
    var res = response.returnValue; //Returns true on success
});