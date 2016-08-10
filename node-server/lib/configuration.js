var util=require("util");
var _ = require("underscore");

module.exports = Configuration;

function Configuration() {
    this.WebSocket = new Configuration.WebSocket();
    if(process.argv.length==3) {
        var configfn=process.cwd()+"/"+process.argv[2];
        if((configfn=require.resolve(configfn))!=null) {
            var customconfig=new (require(configfn));
            var self=this;
            _.keys(customconfig).forEach(function(key) {
                _.extend(self[key],customconfig[key]);
            });
        }
    }
}

Configuration.WebSocket = function() {
    this.port=3040;
    this.path="/";
}
