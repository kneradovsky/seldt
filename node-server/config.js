

module.exports = Configuration;

function Configuration() {
    this.WebSocket = new Configuration.WebSocket();   
}


Configuration.WebSocket = function() {
    this.port=3041;
    this.path="/websocket/connection";
}

