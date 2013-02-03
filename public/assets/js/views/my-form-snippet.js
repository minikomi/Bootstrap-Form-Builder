  var MyFormSnippetView = SnippetView.extend({
  initialize: function(){
    this.constructor.__super__.initialize.call(this);
  }
  , events:{
    "mousedown" : "mouseDownHandler",
    "mouseup"   : "mouseUpHandler"
  }
  , mouseDownHandler : function(mouseDownEvent){
    var that = this;
    mouseDownEvent.preventDefault();
    $(".popover").hide();
    this.$el.popover("show");
    this.$el.on("mousemove", function(mouseMoveEvent){
      if(
        Math.abs(mouseDownEvent.pageX - mouseMoveEvent.pageX) > 10 || 
        Math.abs(mouseDownEvent.pageY - mouseMoveEvent.pageY) > 10
        ){
          $(".popover").hide();
          myForm.collection.remove(that.model);
          $("body").append(new TempSnippetView({model: that.model.clone()}).render());
          pubsub.trigger("newTempCreated", mouseDownEvent);
          that.mouseUpHandler();
        };
    });
  }
  , mouseUpHandler : function(mouseUpEvent) {
    this.$el.off("mousemove");
  }
});
