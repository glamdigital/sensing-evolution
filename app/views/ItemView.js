define(["backbone", "underscore", "hbs!app/templates/item"], function(Backbone, _, itemTemplate) {

  var ItemView = Backbone.View.extend({

    template: itemTemplate,

    serialize: function() {
      var output = this.item.toJSON();

      output.trailId = this.trailId;
      output.nextURL = this.nextURL;

      return output;
    },

    initialize: function(params) {
      this.item = params.item;
      this.trailId = params.trailId;
      this.nextURL = params.nextURL;
    }

  });

  return ItemView;

});
