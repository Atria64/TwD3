//Update -> <h1>TwD3 <span id="version" style="font-size: small;"></span></h1>
var target = document.getElementById("version");
get_manifest(function(manifest) {
    var version = manifest.version;
    target.textContent = "v." + version;
});

//getting manifest.json text.
function get_manifest(callback) {
    var url = 'manifest.json';
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        callback(JSON.parse(xhr.responseText));
    };
    xhr.open(`GET`, url, true);
    xhr.send(null);
}