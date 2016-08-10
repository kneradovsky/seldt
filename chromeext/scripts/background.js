const url = "ws://lefort110:3040/";
var ws = connect(url);
var client = require('client.js').init(ws);

function connect(url) {
  return new WebSocket(url);
}

function reconnect() {
  setTimeout(function() { console.log("trying to connect to the "+url);ws = connect(url);},1000);
}

ws.onopen = function(event) {
  chrome.browserAction.setIcon({"path" :" images/connected.png"});
  ws.send('{type:"introduce","role":"browser"}');
  console.log(event);
}

ws.onerror = function(event) {
  chrome.browserAction.setIcon({"path":"images/not_connected.png"});
  reconnect();
  console.log(event);
}

ws.onclose = function(event) {
  chrome.browserAction.setIcon({"path":"images/not_connected.png"});
  reconnect();
  console.log(event);
}


ws.onmessage = function(message) {
  console.log(message);
  switch (message.type) {
    case "highlight":
      client.highlight(message);
      break;
    case "locate":
      client.locate(message);
      break;
    default:

  }
}
