define(["backbone", "app/models/Topic"], function(Backbone, Topic){

  TopicsCollection = Backbone.Collection.extend({
    url:"app/data/topics.json",
    model: Topic
  });

  return TopicsCollection;

});
