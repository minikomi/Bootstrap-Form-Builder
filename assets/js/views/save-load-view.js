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
         this.model.save();
      }
      , loadIt: function() {
         var self = this;
         if (App.stepForm === null) {
            return;
         }

         var newModels = _.map(App.stepForm.fields, function(fieldInfo) {
            var curSnippet2 = self.findSnippet(fieldInfo.field_type);
            var fields = curSnippet2.get('fields');

            for (var field in fieldInfo) {
               if (field != 'field_type') {
                  // This is kind of weird. We're changing a nested object inside a model.
                  // To do this the backbone way, the simplest way seems to be to get the
                  // whole object, change it, then put it back. This ensures that we still
                  // fire the proper set events. Someone wrote a library to do this more
                  // automatically, but I don't want to go through the hassle of installing
                  // it now. More info:
                  // http://stackoverflow.com/questions/6351271/backbone-js-get-and-set-nested-object-attribute
                  if (!_.isUndefined(fields[field])) {
                     fields[field].value = fieldInfo[field];
                  }
               }
            }
            curSnippet2.set('fields', fields);
            return curSnippet2;
         });

         this.model.snippets.reset(newModels);
      }
      , findSnippet: function(field_type) {
         var curSnippet;
         for (var i = 0; i < this.options.snippets.models.length; ++i) {
            curSnippet = this.options.snippets.models[i];
            if (curSnippet.get('title') == field_type) {
               var clone = jQuery.extend(true, {}, curSnippet.toJSON());
               // Have to jump through hoops to clone a model.
               return new (curSnippet.constructor)(clone);
            }
         }
         return null;
      }
   });
});
