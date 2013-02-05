define([
       "jquery", "underscore", "backbone", "require"
       "templates/snippet-generator.js"
], function(
  $, _, Backbone, req,
  _PopoverMain,
  _PopoverInput, _PopoverSelect, _PopoverTextArea
){
  return Backbone.View.extend({
    tagName: "div"
    , className: "control-group"
    , initialize: function(){ 
      var that = this;
      req(["text!snippet/"+this.options.group"/"+this.model.idFriendlyTitle()], function(_template){
        that.template = _template;
      });
      this.popoverTemplates = {
        "input" : _PopoverInput
        , "select" : _PopoverSelect
        , "textarea" : _PopoverTextArea
      }

    }
    , render: function(){

      // Render the popover to put in the data-content
      var content =  _PopoverTemplate({
        "items" : this.model.get("fields"),
        "popoverTemplates": this.popoverTemplates
      });

      return this.$el.html(
        this.template(this.model.getValues())
      ).attr({                                                    
        "data-content"   : content
        , "data-title"   : this.model.get("title")
        , "data-trigger" : "manual"
        , "data-html"    : true
      }).popover();
    }
  });
});
