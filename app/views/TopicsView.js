define(["backbone", "jquery"], function(Backbone, $) {

  var TopicsView = Backbone.View.extend({

    initialize: function(params) {
      this.topics = params.topics;
      this.topics.on('sync', function() {
        this.render();
      }, this);
    },

    render: function() {
      //todo render
    }
  });

  return TopicsView;

});
