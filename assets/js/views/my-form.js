define([
       "jquery", "underscore", "backbone"
      , "views/temp-snippet"
      , "helper/pubsub"
      , "text!templates/app/renderform.html"
], function(
  $, _, Backbone
  , TempSnippetView
  , PubSub
  , _renderForm
){
  return Backbone.View.extend({
    tagName: "fieldset"
    , initialize: function(){
      this.model.collection.on("add", this.render, this);
      this.model.collection.on("remove", this.render, this);
      this.model.collection.on("change", this.render, this);
      this.model.collection.on("reset", this.render, this);
      this.model.collection.on("change", this.model.collection.sync);
      PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      PubSub.on("tempMove", this.handleTempMove, this);
      PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$build = $("#build");
      this.renderForm = _.template(_renderForm);
      this.render();
    }

    , render: function(){
      //Render Snippet Views
      this.$el.empty();
      var that = this;
      _.each(this.model.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });
      $("#render").val(that.renderForm({
        text: _.map(this.model.collection.renderAllClean(), function(e){return e.html()}).join("\n")
      }));
      this.$el.appendTo("#build form");
      this.delegateEvents();
    }

    , getBottomAbove: function(eventY){
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY  - 90) {
          return true;
        }
        else {
          return false;
        }
      });
      if (topelement){
        return topelement;
      } else {
        return myFormBits[0];
      }
    }

    , handleSnippetDrag: function(mouseEvent, snippetModel) {
      $("body").append(new TempSnippetView({model: snippetModel}).render());
      this.model.collection.remove(snippetModel);
      PubSub.trigger("newTempPostRender", mouseEvent);
    }

    , handleTempMove: function(mouseEvent){
      $(".target").removeClass("target");
      if(mouseEvent.pageX >= this.$build.offset().left &&
          mouseEvent.pageX < (this.$build.width() + this.$build.offset().left) &&
          mouseEvent.pageY >= this.$build.offset().top &&
          mouseEvent.pageY < (this.$build.height() + this.$build.offset().top)){
        $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
      } else {
        $(".target").removeClass("target");
      }
    }

    , handleTempDrop: function(mouseEvent, model, index){
      if(mouseEvent.pageX >= this.$build.offset().left &&
         mouseEvent.pageX < (this.$build.width() + this.$build.offset().left) &&
         mouseEvent.pageY >= this.$build.offset().top &&
         mouseEvent.pageY < (this.$build.height() + this.$build.offset().top)) {
        var index = $(".target").index();
        $(".target").removeClass("target");
        this.model.collection.add(model,{at: index+1});
      } else {
        $(".target").removeClass("target");
      }
    }
  })
});
