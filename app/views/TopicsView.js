define(["backbone", "jquery", "hbs!app/templates/topics"], function(Backbone, $, topicsTemplate) {

  var TopicsView = Backbone.View.extend({

    template: topicsTemplate,

    serialize: function() {
      return {topics: this.topics.toJSON()};
    },

    initialize: function(params) {
      this.topics = params.topics;
      this.topics.on('sync', function() {
        this.render();
      }, this);
    },

  });

  return TopicsView;

});
