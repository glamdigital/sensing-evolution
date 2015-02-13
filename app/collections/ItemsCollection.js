define(["backbone", "app/models/Item"], function(Backbone, Item){

  ItemsCollection = Backbone.Collection.extend({
    url:"app/data/items.json",
    model: Item
  });

  return ItemsCollection;

});
