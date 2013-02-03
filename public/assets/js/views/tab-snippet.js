define([
       "jquery", "underscore", "backbone",
       "views/snippet", "views/temp-snippet"
       "pubsub"
], function(
  $, _, Backbone
  SnippetView
  PubSub
){
  // Snippet Model / View
  return SnippetView.extend({

    events:{
      "mousedown" : "mouseDownHandler"
    }

    , mouseDownHandler: function(mouseDownEvent){
      mouseDownEvent.preventDefault();
      //hide all popovers
      $(".popover").hide();
      $("body").append(new TempSnippetView({model: this.model.clone()}).render());
      $(".temp").css("background-color", "rgba(60,60,60,0.01)");
      PubSub.trigger("newTempPostRender", mouseDownEvent);
    }

  });
});
