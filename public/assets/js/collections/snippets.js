define([
       "jquery" , "underscore" , "backbone"
       , "models/snippet"
       , "views/tab-snippet"
], function(
  $, _, Backbone
  , SnippetModel
  , TabSnippetView
){
  return Backbone.Collection.extend({
    model: SnippetModel
    , renderAll: function(){
      return this.map(function(snippet){
        debugger;
        return new TabSnippetView({group: this.options.title, model: snippet}).render();
      });
    }
  });
});
