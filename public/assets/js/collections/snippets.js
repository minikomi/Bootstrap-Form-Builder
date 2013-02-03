//Snippet Collection
var SnippetsCollection = Backbone.Collection.extend({
  model: SnippetModel
  , renderAll: function(){
    return this.map(function(snippet){
      return new TabSnippetView({model: snippet}).render();
    });
  }
});
