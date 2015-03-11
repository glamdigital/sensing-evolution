define(["backbone", "hbs!app/templates/finished"], function(Backbone, finishedTemplate) {

  var FinishedView = Backbone.View.extend({

    template: finishedTemplate,

      initialize: function(params) {
        this.trail = params.trail;
      },

      serialize: function() {
          var out = {};
          out.trail = this.trail.toJSON();
          return out;
      }
  });

  return FinishedView;

});
