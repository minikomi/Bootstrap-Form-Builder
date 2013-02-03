define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "views/tab" , "views/my-form"
], function(
  $,_, Backbone,
  SnippetsCollection, MyFormSnippetsCollection,
  TabView, MyFormView
){
  //User created form snippets
  var MyFormSnippetsCollection = SnippetsCollection.extend({
    model: SnippetModel
    , renderAll: function(){
      return this.map(function(snippet){
        return new MyFormSnippetView({model: snippet}).render();
      });
    }
  });

  return MyFormSnippetsCollection;
});
