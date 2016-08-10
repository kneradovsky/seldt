Client.prototype.init = function (ws) {
  this.ws = ws;
  this.$ = require('./libs/jquery')
  return this;
};

Client.prototype.highlight = function (message) {
  console.log(message);
};

Client.prototype.locate = function (message) {
  console.log(message);
};
