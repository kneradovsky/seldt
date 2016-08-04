var ws = new WebSocket("ws://lefort110:3040/websocket/connection");

ws.onopen = function(event) {
  chrome.browserAction.setIcon({"path" :" images/connected.png"});
  console.log(event);
}

ws.onerror = function(event) {
  chrome.browserAction.setIcon({"path":"images/not_connected.png"});
  console.log(event);
}
