var SnippetView = Backbone.View.extend({
  tagName: "div"
  , className: "control-group"
  , initialize: function(){ 
    this.template = _.template($("#snippet-"+ mungText(this.model.get("title"))).html())
  }
  , render: function(){
    return this.$el.html(this.template(
      _.reduce(this.model.toJSON(), 
               function(o, v, k){
                 if (k !== "type" || k !== "title") {
                   o[k] = v["value"];
                 }
                 return o;
               },
               {})
    )).attr({
      "data-content"   : popoverTemplate({"items" : _.omit(this.model.toJSON(), "title")})
      , "data-title"   : this.model.get("title")
      , "data-trigger" : "manual"
      , "data-html"    : true
    }).popover()
    this.delegateEvents();
  }
});
