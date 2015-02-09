define(["backbone", "app/collections/ItemsCollection"], function(Backbone, ItemsCollection) {

  //Get all items. Each topic will build its own list of items.
  var allItems = new ItemsCollection();
  allItems.fetch();

  var Topic = Backbone.Model.extend({
    initialize: function () {
      //filter those which are for this topic
      var topicItems = Topic.allItems.where({ topic: this.attributes.slug, trail: this.attributes.trail });
      this.items = new ItemsCollection(topicItems);
    },

    getItems: function(trailSlug) {
      return this.items;
    }

  },
  {
    //class property of all items
    allItems: allItems
  }
  );

  return Topic;

});
