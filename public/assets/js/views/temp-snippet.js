define([
       "jquery"
       , "views/snippet"   
       , "text!templates/app/temp.html"
       , "helper/pubsub"
], function(
  $
  , SnippetView
  , _tempTemplate
  , PubSub
){
  return SnippetView.extend({
    initialize: function(){
      PubSub.on("newTempPostRender", this.postRender, this);
      this.constructor.__super__.initialize.call(this);
      this.tempTemplate = _.template(_tempTemplate);
    }
    , render: function() {
      return this.$el.html(this.tempTemplate({text: this.constructor.__super__.render.call(this).html()}));
    }
    , postRender: function(mouseEvent){
      this._$temp = $(this.$el.find("form")[0]);
      this._$temp.css("-webkit-transform", "rotate(-2deg)");
      this.centerOnEvent(mouseEvent);
    }
    , className: "temp"
    , events:{
      "mousemove": "mouseMoveHandler",
      "mouseup" : "mouseUpHandler",
    }
    , centerOnEvent: function(mouseEvent){
      var mouseX     = mouseEvent.pageX;
      var mouseY     = mouseEvent.pageY;
      var $tempForm  = $(this.$el.find("form")[0]);
      var halfHeight = $tempForm.height()/2;
      var halfWidth  = $tempForm.width()/2;
      $tempForm.css({
        "top"       : (mouseY - halfHeight) + "px",
        "left"      : (mouseX - halfWidth) + "px"
      });
      // Make sure the element has been drawn and 
      // has height in the dom before triggering.
      if (this._$temp.height() > 0) { 
        PubSub.trigger("tempMove", mouseEvent, this._$temp.height());
      }
    }
    , mouseMoveHandler: function(mouseEvent) {
      this.centerOnEvent(mouseEvent);
    }
    , mouseUpHandler: function(mouseEvent){
      PubSub.trigger("tempDrop", mouseEvent, this.model);
      this.remove();
    }
  });
});
