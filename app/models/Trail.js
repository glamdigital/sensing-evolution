define(["backbone", "app/collections/topicsCollection"], function(Backbone, TopicsCollection) {

  // Get all topics. Each Trail will build its own collection of topics which belong to it.
  var allTopics = new TopicsCollection();

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

    parse: function(response) {
        var t = response;
        t.slug = response.slug;
        t.title = response.title;
        t.video = response.video;
        t.fixed_order = response.fixed_order=="true" || response.fixed_order=="TRUE";
        return t;
    }

  },
  {
    //Class property stores all topics
    allTopics: allTopics,
      loadTopics: function(callback) {
        allTopics.fetch({success: callback});
      }
  }
  );

  return Trail;

});
