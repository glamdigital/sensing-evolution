define(["backbone", "jquery", "hbs!app/templates/trails"], function(Backbone, $, trailsTemplate) {

  var TrailsView = Backbone.View.extend({
    template: trailsTemplate,

    serialize: function() {
      return { trails: this.trails.toJSON() };
    },

    initialize: function(params) {
      this.trails = params.trails;
      this.trails.on('sync', function() {
        this.render();
      }, this);
    }

  });

  return TrailsView;

});
