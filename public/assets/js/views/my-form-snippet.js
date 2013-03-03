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
          PubSub.trigger("mySnippetDrag", that.model, mouseDownEvent);
          that.mouseUpHandler();
        };
      });
    }

    , mouseUpHandler : function(mouseUpEvent) {
      this.$el.off("mousemove");
    }
  });
});
