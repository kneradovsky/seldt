(function(){
var url = "ws://localhost:3040/";
var ws = connect(url);


var onError = function(event) {
  chrome.browserAction.setIcon({"path":"images/not_connected.png"});
  reconnect();
  console.log(event);
}



function connect(url) {
  return new WebSocket(url);
};

function reconnect() {
  setTimeout(function() { console.log("trying to connect to the "+url);ws = connect(url);},1000);
};

ws.onopen = function(event) {
  chrome.browserAction.setIcon({"path" :" images/connected.png"});
  ws.send('{"type":"introduce","role":"browser"}');
  console.log(event);
};

ws.onerror = onError;


ws.onclose = function(event) {
  chrome.browserAction.setIcon({"path":"images/not_connected.png"});
  reconnect();
  console.log(event);
};


ws.onmessage = function(message) {
  console.log(message);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var msg = JSON.parse(message.data);
    chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
      console.log(response);
    });
  });
};
})();
