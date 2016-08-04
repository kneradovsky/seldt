
var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');

var Configuration = require("./configuration");
var WebSocketEvents = require("./websockets");

var config = new Configuration();

var wsserver = new WebSocketEvents(config.WebSocket);

module.exports=Server;
var logger = console;

function Server() {

    this.wsserver=wsserver;
    wsserver.wss.once('listening',this.onlistening());
    logger.log("current WS config:"+JSON.stringify(config.WebSocket));
    this.servicesinited=0;
    return this;
};


Server.prototype.stopserver=function() { 
    try {
    this.wsserver.terminate();this.httpserver.close();
    } catch(err) {
        console.log(err);
    }
}

Server.prototype.initcomplete=function () {};

Server.prototype.onlistening = function() {
    var self=this;
    return function() {
        if(++self.servicesinited>1)
            self.initcomplete();
    }
}

