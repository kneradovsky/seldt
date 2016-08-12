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
  var self = this;
  var elements_array=[];
  var errors = []
  message.elements.forEach((element,index) => {
    try {
      if(element.by=='xpath') {
        var elcols = document.evaluate(element.value,document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
        var el;
        while((el = elcols.iterateNext())!=null) elements_array.push(el);
      }
    }
    catch(e) {console.log(e);errors.push(e.message);}
  });
  this.highlightCollection(elements_array);
  response({"status":(errors.length==0 ? "ok": "error"),"errors":errors});
}

ContentScript.prototype.highlightCollection = function(collection) {
  console.log(collection.length);
  $(collection).each((int,el) => {
    $(el).data("saved-border-color",$(el).css("border-color"));
    $(el).css("border-color","#ff0000");
    $(el).data("saved-border-style",$(el).css("border-style"));
    $(el).css("border-style","solid");

  });
  setTimeout(() => { $(collection).each((ind,el)=>
    {
      $(el).css("border-color",$(el).data("saved-border-color"));
      $(el).removeData("saved-border-color");
      $(el).css("border-style",$(el).data("saved-border-style"));
      $(el).removeData("saved-border-style");
    }
    )
  },1000);

}

ContentScript.prototype.locate = function(message,response) {
  console.log(message);

}
})();
