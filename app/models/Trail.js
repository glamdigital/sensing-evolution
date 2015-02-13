define(["backbone", "app/collections/topicsCollection"], function(Backbone, TopicsCollection) {

  // Get all topics. Each Trail will build its own collection of topics which belong to it.
  var allTopics = new TopicsCollection();
  allTopics.fetch();

  var Trail = Backbone.Model.extend({
    initialize: function () {
      //get all the topics which include this trail in their list of trails
      this.topics = new TopicsCollection( Trail.allTopics.filter( function(topic) {
        return topic.attributes.trails.indexOf(this.attributes.slug) >= 0;
      }, this) );
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
