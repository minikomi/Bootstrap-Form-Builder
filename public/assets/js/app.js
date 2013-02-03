define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "views/tab" , "views/my-form"
], function(
  $,_, Backbone,
  SnippetsCollection, MyFormSnippetsCollection,
  TabView, MyFormView
){

  var initialize = function(){

    // Bootstrap "My Form" with 'Form Name' snippet.
    new MyFormView({
      collection: new MyFormSnippetsCollection(
        [
          {
            "title" : "Form Name"
            , "fields": {
              "name" : { 
                "label" : "Form Name"
                , "type"  : "text"
                , "value" : "Form Name"
              }
            }
          }
        ]
      )
    });

    //Bootstrap tabs from json.
    new TabView({
      collection: new SnippetsCollection(
        [
          {
        "title": "Text Input",
        "fields": {
          "label": {
            "label": "Label Text",
            "type": "text",
            "value": "label"
          },
          "placeholder": {
            "label": "Placeholder",
            "type": "text",
            "value": "placeholder"
          },
          "helptext": {
            "label": "Help Text",
            "type": "text",
            "value": "help"
          }
        }
      },
      {
        "title": "Search Input",
        "fields": {
          "label": {
            "label": "Label Text",
            "type": "text",
            "value": "label"
          },
          "placeholder": {
            "label": "Placeholder",
            "type": "text",
            "value": "placeholder"
          },
          "helptext": {
            "label": "Help Text",
            "type": "text",
            "value": "help"
          }
        }
      },
      {
        "title": "Prepended Text",
        "fields": {
          "label": {
            "label": "Label Text",
            "type": "text",
            "value": "label}"
          },
          "prepend": {
            "label": "Prepend",
            "type": "text",
            "value": "prepend"
          },
          "placeholder": {
            "label": "Placeholder",
            "type": "text",
            "value": "placeholder"
          },
          "helptext": {
            "label": "Help Text",
            "type": "text",
            "value": "help"
          }
        }
      },
      {
        "title": "Appended Text",
        "fields": {
          "label": {
            "label": "Label Text",
            "type": "text",
            "value": "label}"
          },
          "append": {
            "label": "Append",
            "type": "text",
            "value": "append"
          },
          "placeholder": {
            "label": "Placeholder",
            "type": "text",
            "value": "placeholder"
          },
          "helptext": {
            "label": "Help Text",
            "type": "text",
            "value": "help"
          }
        }
      }
      ]
      )
    });

    //Make the first tab active!
    $(".tab-pane").first().addClass("active");
    $("ul.nav li").first().addClass("active");
  }

  return {
    initialize: initialize
  };
});
