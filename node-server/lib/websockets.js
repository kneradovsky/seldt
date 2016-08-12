
var util         = require("util");
var WebSocket = require('ws');
var EventEmitter = require("events").EventEmitter;

var _ = require("underscore");
var async = require('async');

module.exports = WSServer;
util.inherits(WSServer,EventEmitter);
var logger=console;

function WSServer(options) {
    EventEmitter.call(this);

    this.wss = new WebSocket.Server(options);
    this.history={};
    var self=this;
    this.wss.on('error',this.onerror);
    this.wss.on('connection',this.createOnConnection());
    this.on('introduce',this.openSession);
    this.on('highlight',this.highlight);
    this.on('locate',this.locate);
    this.on('found',this.found);
    this.webbrowser=undefined;
    this.webdriver=undefined;
    return self;
}

WSServer.prototype.onerror = function(err) {
    logger.log(err);
};

WSServer.prototype.onclose = function(err) {
    logger.log(err);
};

WSServer.prototype.createOnConnection = function() {
    var self=this;

    WSServer.prototype.onconnection = function(ws) {
        var server=this;
        ws.on('message',function (msg,flags) {
            logger.log("msg:"+msg);
            try {
                var message=JSON.parse(msg);
                self.emit(message.type,ws,message,flags);
            } catch(err) {
                logger.log("error:"+err);
                ws.send('{type: "error",data:"invalid data"}');
            }
        });
        ws.on('close',function() {
            self.emit('connclosed',ws);
        });

    };

    return WSServer.prototype.onconnection;
}

WSServer.prototype.openSession = function(socket,msg,flags) {
    switch(msg.role) {
        case "browser": this.webbrowser=socket;break
        case "driver": this.webdriver = socket;break;
    }
}

WSServer.prototype.highlight = function(socket,msg,flags) {
    console.log("webbrowser:"+(this.webbrowser === undefined ? "undefined" : "defined"));
    this.webbrowser === undefined || this.webbrowser.send(JSON.stringify(msg));
}

WSServer.prototype.locate = function(socket,msg,flags) {
    console.log("webbrowser:"+(this.webbrowser === undefined ? "undefined" : "defined"));
    this.webbrowser === undefined || this.webbrowser.send(JSON.stringify(msg));
}

WSServer.prototype.found = function(socket,msg,flags) {
    console.log("webdriver:"+(this.webdriver === undefined ? "undefined" : "defined"));
    this.webdriver === undefined || this.webdriver.send(JSON.stringify(msg));
}



WSServer.prototype.terminate = function() {
    this.wss.close();
}


WSServer.prototype.send_error=function(error) {
    logger.log(error);
};
