(function() {

var script = document.createElement('script');
script.type = 'text/javascript';
script.charset = 'utf-8';
script.src = chrome.extension.getURL('page.js');
document.head.appendChild(script);

})();
