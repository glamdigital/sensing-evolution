define(["backbone", "app/collections/ItemsCollection"], function(Backbone, ItemsCollection) {

  var Topic = Backbone.Model.extend({
    initialize: function () {
      var allItems = new ItemsCollection();
      allItems.fetch({
        success: _.bind(function(){
          //filter those which are for this topic
          var topicItems = allItems.where({ topic: this.attributes.slug, trail: this.attributes.trail });
          this.items = new ItemsCollection(topicItems);
        }, this)
      });
    },

    getItems: function(trailSlug) {
      return this.items;
    }

  });

  return Topic;

});
