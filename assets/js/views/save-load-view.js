define([
      "jquery", "underscore", "backbone"
], function($, _, Backbone)
{
   return Backbone.View.extend({
      events: {
         "click .saveButton": 'saveIt',
         'click .loadButton': 'loadIt'
      }
      , saveIt: function() {
         var serialized = this.model.toJSON();
         console.log(serialized);
      }
      , loadIt: function() {
         var self = this;
         var testStr = 
      '{"stepid":123,"fields":[{"id":"textinput1","placeholder":"placeholder2","required":true,"label":"Text Input3","fieldtype":"Text Input"},{"id":"passwordinput4","placeholder":"placeholder5","required":false,"label":"Password Input6","fieldtype":"Password Input"}]}';

         var parsed = JSON.parse(testStr);
         
         this.model.set('stepid', parsed.stepid);
         var newModels = _.map(parsed.fields, function(fieldInfo) {
            var curSnippet = self.findSnippet(fieldInfo.fieldtype);
            var fields = curSnippet.get('fields');

            for (var field in fieldInfo) {
               if (field != 'fieldtype') {
                  // This is kind of weird. We're changing a nested object inside a model.
                  // To do this the backbone way, the simplest way seems to be to get the
                  // whole object, change it, then put it back. This ensures that we still
                  // fire the proper set events. Someone wrote a library to do this more
                  // automatically, but I don't want to go through the hassle of installing
                  // it now. More info:
                  // http://stackoverflow.com/questions/6351271/backbone-js-get-and-set-nested-object-attribute
                  fields[field].value = fieldInfo[field];
               }
            }
            curSnippet.set('fields', fields);
            return curSnippet;
         });
         console.log(newModels);
         this.model.collection.reset(newModels);

         //this.model.load(parsed);
      }
      , findSnippet: function(fieldtype) {
         var curSnippet;
         for (var i in this.options.snippets.models) {
            curSnippet = this.options.snippets.models[i];
            if (curSnippet.get('title') == fieldtype) {
               return curSnippet;
            }
         }
         return null;
      }
   });
});
