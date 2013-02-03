// Snippet Model / View
var TabSnippetView = SnippetView.extend({
  events:{
    "mousedown" : "mouseDownHandler"
  }
  , mouseDownHandler: function(mouseDownEvent){
    mouseDownEvent.preventDefault();
    //hide all popovers
    $(".popover").hide();
    $("body").append(new TempSnippetView({model: this.model.clone()}).render());
    $(".temp").css("background-color", "rgba(60,60,60,0.01)");
    pubsub.trigger("newTempPostRender", mouseDownEvent);
  }
});
