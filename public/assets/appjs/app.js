// Set up templates
var popoverTemplate         = _.template($("#popover-main").html());
var popoverItemTemplates    = {
  "text"     : _.template($("#popover-input").html()),
  "textarea" : _.template($("#popover-textarea").html()),
  "select"   : _.template($("#popover-select").html())
}
var tabnavTemplate         = _.template($("#tab-nav").html());
var tempTemplate           = _.template($("#temp-template").html());

// Create Snippets

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
// Make tabs
tabMaker("Text Inputs", textInputSnippets)

//Make the first tab active!
$(".tab-pane").first().addClass("active");
$("ul.nav li").first().addClass("active");

//Set up form with title element.
var myFormCollection = new MyFormSnippetsCollection([formName]);
var myForm = new MyForm({ collection: myFormCollection, pubsub: pubsub })
