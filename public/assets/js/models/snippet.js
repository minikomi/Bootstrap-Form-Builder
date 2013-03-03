define([
      'jquery', 'underscore', 'backbone'
], function($, _, Backbone) {
  return Backbone.Model.extend({
    getValues: function(){
      return _.reduce(this.get("fields"), function(o, v, k){
        o[k]  = v["value"];
        return o;
      }, {});
    }
    , idFriendlyTitle: function(){
      return this.get("title").replace(/\W/g,'').toLowerCase();
    }
  });
});
