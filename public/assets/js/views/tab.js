// Tab Collection / View
var Tab = Backbone.View.extend({
  tagName: "div"
  , className: "tab-pane"
  , initialize: function() {
    this.id = this.options.title.toLowerCase().replace(/\W/g,'');
  }
  , render: function(){
    // Render Snippet Views
    var that = this;
    _.each(this.collection.renderAll(), function(snippet){
      that.$el.append(snippet);
    });

    // Render & append nav for tab
    $(".nav.nav-tabs").append(tabnavTemplate({title: this.options.title, id: this.id}))

    // Render tab
    this.$el.attr("id", this.id);
    this.$el.appendTo(".tab-content");
    this.delegateEvents();
  }
});
