define([
   'jquery', 'underscore', 'backbone', 'models/snippet',
   'collections/snippets', 'collections/my-form-snippets'
], function($, _, Backbone, SnippetModel,
  SnippetsCollection, MyFormSnippetsCollection
){
   return Backbone.Model.extend({
      initialize: function() {
         var self = this;
         this.collection = new MyFormSnippetsCollection([]);
         this.collection.on('change add', function() {
            // TODO: Save?
            console.log(JSON.stringify(self));
         });
      }
      , toJSON: function() {
         return {
            'stepid': this.get('stepid')
            , 'fields': this.collection.toJSON()
         }
      }, load: function(values) {
         this.set('stepid', values.stepid);
         _.each(values.fields, function(fieldInfo) {
            console.log(fieldInfo);
         });
      }
   });
});
