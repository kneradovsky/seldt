(function() {
  console.log("Selenium tools");
var cc = new ContentScript();

chrome.runtime.onMessage.addListener(function(message,sender,response) {
  console.log(message);
  switch(message.type) {
    case "highlight" : cc.highlight(message,response);break;
    case "locate" : cc.locate(message,response);break;
  }

});

function ContentScript() {
  return this;
}

ContentScript.prototype.highlight = function(message,response) {
  console.log(message);
  for(element in message.elements) {
    if(element.by=='xpath') {
      var elcols = document.evaluate(element.value,document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
      this.highlightCollection(jQuery.makeArray(ecols));
    }
  }
  response({"status":"ok"});
}

ContentScript.prototype.highlightCollection = function(collection) {
  console.log(collection);
  var borderColor = $(collection).css("border-color");
  $(collection).css("border-color","#FFF");
  setTimeout(function() {$(collection).css("border-color",borderColor);},1000);

}

ContentScript.prototype.locate = function(message,response) {
  console.log(message);

}
})();
