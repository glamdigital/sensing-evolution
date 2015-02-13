define(["backbone", "app/collections/topicsCollection"], function(Backbone, TopicsCollection) {

  // Get all topics. Each Trail will build its own collection of topics which belong to it.
  var allTopics = new TopicsCollection();
  allTopics.fetch();

  var Trail = Backbone.Model.extend({
    initialize: function () {
      this.topics = new TopicsCollection(Trail.allTopics.where({trail: this.attributes.slug}));
    },

    //return a TopicsCollection featuring all topics for this trail
    getTopics: function () {
      return this.topics;
    },

  },
  {
    //Class property stores all topics
    allTopics: allTopics,
  }
  );

  return Trail;

});
