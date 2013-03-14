define([
       "jquery", "underscore", "backbone",
       "views/snippet", "views/temp-snippet",
       "helper/pubsub"
], function(
  $, _, Backbone,
  SnippetView, TempSnippetView,
  PubSub
){
  return SnippetView.extend({
    events:{
      "mousedown" : "mouseDownHandler"
      , "mouseup"   : "mouseUpHandler"
    }

    , mouseDownHandler : function(mouseDownEvent){
        this.popover = true;
      var that = this;
      mouseDownEvent.preventDefault();
      $(".popover").remove();
      this.$el.popover("show");
      $(".popover #save").on("click", this.saveHandler(that));
      $(".popover #cancel").on("click", this.cancelHandler(that));

      if(this.model.cid != "c1"){
        $("body").on("mousemove", function(mouseMoveEvent){
          if(
            Math.abs(mouseDownEvent.pageX - mouseMoveEvent.pageX) > 10 || 
            Math.abs(mouseDownEvent.pageY - mouseMoveEvent.pageY) > 10
          ){
            that.$el.popover('destroy');
            PubSub.trigger("mySnippetDrag", mouseDownEvent, that.model);
            that.mouseUpHandler();
          };
        });
      }
    }

    , preventPropagation : function(e){
      e.stopPropagation();

    }

    , mouseUpHandler : function(mouseUpEvent) {
        $("body").off("mousemove");
    }

    , saveHandler : function(boundContext) {
      return function(mouseEvent) {
        mouseEvent.preventDefault();
        console.log(boundContext.model);
        $(".popover").remove();
      }
    }

    , cancelHandler : function(boundContext) {
      return function(mouseEvent) {
        mouseEvent.preventDefault();
        console.log(boundContext.model);
        $(".popover").remove();
      }
    }

  });
});
