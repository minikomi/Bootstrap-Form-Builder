define([
       'underscore',
       'backbone'
], function( _, Backbone) {
  // Base model for all snippets.
  var SnippetModel  = Backbone.Model.extend({

    // Just the values used to create the final form 
    getValues: function(){
      return _.reduce(this.get("fields"), function(obj, v){
        obj[v["name"]]  = v["value"];
        return obj;
      }, {})
    }

    // Used by popover. Fields just identified by titles in id's
    , idFriendlyTitle: function(){
      return this.get("title").toLowerCase().replace(/\W/g,'')
    }
  });
});
