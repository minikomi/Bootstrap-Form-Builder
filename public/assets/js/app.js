define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "views/tab" , "views/my-form"
], function(
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , TabView, MyFormView
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
        , collection: new SnippetsCollection(
          [
          {
            "title": "Text Input",
            "fields": {
              "label": {
                "label": "Label Text",
                "type": "input",
                "value": "label"
              },
              "placeholder": {
                "label": "Placeholder",
                "type": "input",
                "value": "placeholder"
              },
              "helptext": {
                "label": "Help Text",
                "type": "input",
                "value": "help"
              }
            }
          },
          {
            "title": "Search Input",
            "fields": {
              "label": {
                "label": "Label Text",
                "type": "input",
                "value": "label"
              },
              "placeholder": {
                "label": "Placeholder",
                "type": "input",
                "value": "placeholder"
              },
              "helptext": {
                "label": "Help Text",
                "type": "input",
                "value": "help"
              }
            }
          },
          {
            "title": "Prepended Text",
            "fields": {
              "label": {
                "label": "Label Text",
                "type": "input",
                "value": "label"
              },
              "prepend": {
                "label": "Prepend",
                "type": "input",
                "value": "prepend"
              },
              "placeholder": {
                "label": "Placeholder",
                "type": "input",
                "value": "placeholder"
              },
              "helptext": {
                "label": "Help Text",
                "type": "input",
                "value": "help"
              }
            }
          }
        ])
      });

      //Make the first tab active!
      $(".tab-pane").first().addClass("active");
      $("ul.nav li").first().addClass("active");
    }
  }
});
