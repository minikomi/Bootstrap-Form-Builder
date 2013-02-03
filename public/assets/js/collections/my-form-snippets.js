
//User created form snippets
var MyFormSnippetsCollection = SnippetsCollection.extend({
  model: SnippetModel
  , renderAll: function(){
    return this.map(function(snippet){
      return new MyFormSnippetView({model: snippet}).render();
    });
  }
});

