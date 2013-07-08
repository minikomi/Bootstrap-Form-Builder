define([
      'jquery', 'underscore', 'backbone'
], function($, _, Backbone) {
  return Backbone.Model.extend({
    getValues: function(){
      var reduced = _.reduce(this.get("fields"), function(o, v, k){
        if (v["type"] == "select") {
          o[k] = _.find(v["value"], function(o){return o.selected})["value"];
        } else {
          o[k]  = v["value"];
        }
        return o;
      }, {});
      reduced.field_type = this.get('title');
      if (reduced.field_guid == 'temporary-id') {
         // Make a unique id for the field that will be passed around
         // across edits. Must start with a letter, so we start with
         // 'field_'.  Includes the label, stepid, date and a random number.
         // If we get duplicates, I'll eat my hat (figuratively).
         var newId = 'field_' + reduced.label + '_' + App.stepid + '_' +
          (new Date().toString()) + '_' + Math.random();
         reduced.field_guid = newId.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      }
      return reduced;
    }
    , idFriendlyTitle: function(){
      return this.get("title").replace(/\W/g,'').toLowerCase();
    }
    , setField: function(name, value) {
      var fields = this.get("fields")
      fields[name]["value"] = value;
      this.set("fields", fields);
    }
  });
});
