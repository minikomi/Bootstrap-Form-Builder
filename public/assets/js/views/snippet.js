define([
       "jquery", "underscore", "backbone"
       , "text!templates/popover/popover-main.html"
       , "text!templates/popover/popover-input.html"
       , "text!templates/popover/popover-select.html"
       , "text!templates/popover/popover-textarea.html"
       , "templates/snippet/snippet-templates"
       , "bootstrap"
], function(
  $, _, Backbone
  , _PopoverMain
  , _PopoverInput
  , _PopoverSelect
  , _PopoverTextArea
  , _snippetTemplates
){
  return Backbone.View.extend({
    tagName: "div"
    , className: "control-group"
    , initialize: function(){ 
      this.template = _.template(_snippetTemplates[this.model.idFriendlyTitle()])
      this.popoverTemplates = {
        "input" : _.template(_PopoverInput)
        , "select" : _.template(_PopoverSelect)
        , "textarea" : _.template(_PopoverTextArea)
      }
    }
    , render: function(){
      var that = this;
      var content = _.template(_PopoverMain)({
        "title": that.model.get("title"),
        "items" : that.model.get("fields"),
        "popoverTemplates": that.popoverTemplates
      });
      debugger;
      return this.$el.html(
        that.template(that.model.getValues())
      ).attr({                                                    
        "data-content"   : content
        , "data-title"   : that.model.get("title")
        , "data-trigger" : "manual"
        , "data-html"    : true
      })
    }
  });
});
