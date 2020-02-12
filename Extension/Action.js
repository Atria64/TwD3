//debug用メッセージ
//window.alert('Twitterの使用を検知');

//chrome.*を呼び出すためだけのsendMessage
chrome.runtime.sendMessage({ Value: 'Value' }, function(response) {
    var res = response.returnValue; //成功時true
});