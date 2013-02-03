 define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/project/list.html'
], function($, _, Backbone, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  }

  return {
    initialize: initialize
  };
});

// Form Name
var formName = new SnippetModel({
  "title" : "Form Name"
  , "fields": [
    {"name": "name", "label" : "Form Name"  , "type" : "text" , "value" : "Form Name"}
  ]
});

//Text Input Snippets
var textInput = new SnippetModel({
  "title" : "Text Input"
  , "fields": [
      {"name" : "label"       ,"label"    : "Label Text"  , "type" : "text" , "value" : "label"}
    , {"name" : "prepend"     ,"label"    : "Prepend"     , "type" : "text" , "value" : "prepend"}
    , {"name" : "placeholder" ,"label"    : "Placeholder" , "type" : "text" , "value" : "placeholder"}
    , {"name" : "helptext"    ,"label"    : "Help Text"   , "type" : "text" , "value" : "help"}
  ]
});

// Bundle snippets for tabs
var textInputSnippets = new SnippetsCollection([
                                               textInput
]);

//Make the first tab active!
$(".tab-pane").first().addClass("active");
$("ul.nav li").first().addClass("active");

//Set up form with title element.
var myFormCollection = new MyFormSnippetsCollection([formName]);

