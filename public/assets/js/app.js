define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "views/tab" , "views/my-form"
       , "text!data/input.json"
], function(
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , TabView, MyFormView
  , inputJSON
){
  return {
    initialize: function(){
      // Bootstrap "My Form" with 'Form Name' snippet.
      new MyFormView({
        title: "Original"
        , collection: new MyFormSnippetsCollection(
        [
          { "title" : "Form Name"
            , "fields": {
              "name" : {
                "label"   : "Form Name"
                , "type"  : "input"
                , "value" : "Form Name"
              }
            }
          }
        ])
      });

      //Bootstrap tabs from json.
      new TabView({
        title: "Input"
        , collection: new SnippetsCollection(JSON.parse(inputJSON))
      });
      new TabView({
        title: "Ogawa"
        , collection: new SnippetsCollection(JSON.parse(inputJSON))
      });

      //Make the first tab active!
      $(".tab-pane").first().addClass("active");
      $("ul.nav li").first().addClass("active");
    }
  }
});
