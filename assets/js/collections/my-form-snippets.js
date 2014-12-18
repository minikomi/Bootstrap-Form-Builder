define([
       "jquery" , "underscore" , "backbone"
       , "models/snippet"
       , "collections/snippets"
       , "views/my-form-snippet"
], function(
  $, _, Backbone
  , SnippetModel
  , SnippetsCollection
  , MyFormSnippetView
){
  return SnippetsCollection.extend({
    model: SnippetModel
    , initialize: function() {
      this.counter = {};
      this.on("add", this.giveUniqueId);
    }

    , giveUniqueId: function(snippet){
      if(!snippet.get("fresh")) {
        return;
      }
      snippet.set("fresh", false);
      var snippetType = snippet.attributes.fields.id.value;

      if(typeof this.counter[snippetType] === "undefined") {
        this.counter[snippetType] = 0;
      } else {
        this.counter[snippetType] += 1;
      }

      snippet.setField("id", snippetType + "-" + this.counter[snippetType]);

      if(typeof snippet.get("fields")["id2"] !== "undefined") {
        snippet.setField("id2", snippetType + "2-" + this.counter[snippetType]);
      }
    }
    , containsFileType: function(){
      return !(typeof this.find(function(snippet){
        return snippet.attributes.title === "File Button"
      }) === "undefined");
    }
    , renderAll: function(){
      return this.map(function(snippet){
        return new MyFormSnippetView({model: snippet}).render(true);
      })
    }
    , renderAllClean: function(){
      return this.map(function(snippet){
        return new MyFormSnippetView({model: snippet}).render(false);
      });
    }
  });
});
