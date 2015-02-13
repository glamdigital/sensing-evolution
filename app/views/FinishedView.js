define(["backbone", "hbs!app/templates/finished"], function(Backbone, finishedTemplate) {

  var FinishedView = Backbone.View.extend({

    template: finishedTemplate,

  });

  return FinishedView;

});
