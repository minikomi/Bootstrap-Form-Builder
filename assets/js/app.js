define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "models/my-form-snippets-wrapper"
       , "views/tab" , "views/my-form", "views/save-load-view"
       , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"
       , "text!templates/app/render.html",  "text!templates/app/about.html", 
], function(
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , MyFormSnippetsWrapper
  , TabView, MyFormView, SaveLoadView
  , inputJSON, radioJSON, selectJSON, buttonsJSON
  , renderTab, aboutTab
){
  return {
    initialize: function(){
      var inputSnippets = new SnippetsCollection(JSON.parse(inputJSON));
      var radioSnippets = new SnippetsCollection(JSON.parse(radioJSON));
      var selectSnippets = new SnippetsCollection(JSON.parse(selectJSON));
      var buttonSnippets = new SnippetsCollection(JSON.parse(buttonsJSON));
      var allSnippets = new SnippetsCollection(inputSnippets.toJSON())
       .add(radioSnippets.toJSON()).add(selectSnippets.toJSON())
       .add(buttonSnippets.toJSON());

      //Bootstrap tabs from json.
      new TabView({
        title: "Input"
        , collection: inputSnippets
      });
      /*
      new TabView({
        title: "Radios / Checkboxes"
        , collection: radioSnippets
      });
      new TabView({
        title: "Select"
        , collection: selectSnippets
      });
      new TabView({
        title: "Buttons"
        , collection: buttonSnippets
      });
      new TabView({
        title: "Rendered"
        , content: renderTab
      });
      */
      new TabView({
        title: "About"
        , content: aboutTab
      });


      //Make the first tab active!
      $(".tab-pane").first().addClass("active");
      $("ul.nav li").first().addClass("active");
      // Bootstrap "My Form" with 'Form Name' snippet.
      var wrapper = new MyFormSnippetsWrapper();
      new MyFormView({
        title: "Original"
        , model: wrapper
      });

      var saveLoad = new SaveLoadView({
         el: $('#saveLoadButtons')
         , model: wrapper
         , snippets: allSnippets
      });

      saveLoad.loadIt();
    }
  }
});
