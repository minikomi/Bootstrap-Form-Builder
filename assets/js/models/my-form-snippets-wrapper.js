define([
   'jquery', 'underscore', 'backbone', 'models/snippet',
   'collections/snippets', 'collections/my-form-snippets'
], function($, _, Backbone, SnippetModel,
  SnippetsCollection, MyFormSnippetsCollection
){
   return Backbone.Model.extend({
      initialize: function() {
         var self = this;
         this.snippets = new MyFormSnippetsCollection([]);
      }
      , toJSON: function() {
         return {
            fields: this.snippets.toJSON()
         }
      }, load: function(values) {
         _.each(values.fields, function(fieldInfo) {
            console.log(fieldInfo);
         });
      }
      , sync: function(method, model, options) {
         // We never want to update, just add a new form.
         method = method == 'read' ? 'read' : 'create';
         var myOptions = _(options).extend({
            crossDomain: true
            , dataType: 'json'
            , headers: {
               'X-CSRF': CSRF.get(),
               'X-ALLOW-HTTP': true
            }
            // , url: "https://" + window.location.hostname + "/api/2.0/step_forms/" +
            // We used to force https but now we do not for items originating from a
            // Dozuki-controlled domain.
            , url: "/api/2.0/step_forms/" +
               App.stepid
            , xhrFields: {
               withCredentials: true
            }
         });
         return Backbone.sync(method, model, options);
      }
   });
});
