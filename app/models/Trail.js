define(["backbone", "app/collections/topicsCollection"], function(Backbone, TopicsCollection) {

  var Trail = Backbone.Model.extend({
    initialize: function () {
      var allTopics = new TopicsCollection();
      allTopics.fetch( {
        success: _.bind(function () {
          //filter to those for this trail
          var trailTopics = allTopics.where({ trail: this.attributes.slug });
          this.topics = new TopicsCollection(trailTopics);
        }, this),
        error: function () {
          console.log("error fetching topics for trail");
        }
      } );
    },

    //return a TopicsCollection featuring all topics for this trail
    getTopics: function () {
      return this.topics;
    },

  });

  return Trail;

});
