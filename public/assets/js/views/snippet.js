//TODO
var SnippetView = Backbone.View.extend({
  tagName: "div"
  , className: "control-group"
  , initialize: function(){ 
    this.template = _.template($("#snippet-"+this.model.idFriendlyTitle()).html())
  }
  , render: function(){
    return this.$el.html(
      this.template(this.model.getValues())
    ).attr({                                                    
      "data-content"   : popoverTemplate({"items" : this.model.get("fields")})
      , "data-title"   : this.model.get("title")
      , "data-trigger" : "manual"
      , "data-html"    : true
    }).popover();
    this.delegateEvents();
  }
});
