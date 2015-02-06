define(["backbone", "underscore", "hbs!app/templates/item"], function(Backbone, _, itemTemplate) {

  var ItemView = Backbone.View.extend({

    template: itemTemplate,

    serialize: function() {
      var output = this.item.toJSON();
      output.trailId = this.trailId;
      output.topicIndex = this.topicIndex;
      output.nextItemIndex = this.itemIndex +1;

      return output;
    },

    initialize: function(params) {
      this.item = params.item;
      this.trailId = params.trailId;
      this.topicIndex = params.topicIndex;
      this.itemIndex = params.itemIndex;
    }

  });

  return ItemView;

});
