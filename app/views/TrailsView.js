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
        $(window).resize(this.adjustPosition);
    },

      afterRender: function() {
        this.adjustPosition();
      },
      adjustPosition: function() {
          //adjust position to centre the container in the screen
          var $container = $('.trails-list-container');
          var h = $container.height();
          var wHeight = $(window).height();
          var top = (wHeight-h)/2;
          $container.css('top', top + "px");
      },
      render: function() {
          console.log(rendering);
      }
  });

  return TrailsView;

});
