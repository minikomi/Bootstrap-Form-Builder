define([
      'jquery', 'underscore', 'backbone'
], function($, _, Backbone) {
  return Backbone.Model.extend({
    getValues: function(){
      var reduced = _.reduce(this.get("fields"), function(o, v, k){
        var tmpVal;
        if (v["type"] == "select") {
          tmpVal = _.find(v["value"], function(o){return o.selected})["value"];
        } else {
          tmpVal = v["value"];
        }
        if (v.hasOwnProperty("auxiliary") && v["auxiliary"]) {
          if (!o.hasOwnProperty("options")) {
             o.options = {};
          }
          o.options[k] = tmpVal;
        } else {
           o[k] = tmpVal;
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
      var fields = this.get("fields");
      fields[name]["value"] = value;
      this.set("fields", fields);
    }
  });
});
