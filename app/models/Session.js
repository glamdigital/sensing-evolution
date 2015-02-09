define(["backbone"], function(Backbone) {

  var Session = Backbone.Model.extend({

    initialize: function(trail) {

      this.trail = trail;

      //initialise the visited/unvisited collections
      this.visitedItems = new ItemsCollection();
      this.unvisitedItems = new ItemsCollection();

      //get all topics for the trail
      var topics = trail.getTopics();

      //randomise order of topics
      _.shuffle(topics);

      //get all items for the topic, shuffle and add to unvisited items
      for(var i=0; i<topics.length; i++) {
        var topic = topics.at(i);
        var items = topic.getItems();
        _.shuffle(items);
        for(var j=0; j<items.length; j++) {
          this.unvisitedItems.add(items.at(j));
        }
      }

    },

    hasNext: function() {
      //returns true if there is a next item
      return _.size(this.unvisitedItems);
    },

    getNext: function() {
      //returns the next item
      return this.unvisitedItems.at(0);
    },

    getNextURL: function() {
      if(this.hasNext()) {
        var item = this.unvisitedItems.at(0);
        var URL = '#/item/' + item.attributes.slug;
        return URL;
      }
      else {
        //finished
        return '#/finished';
      }
    },

    getItem: function(slug) {
      var item = this.unvisitedItems.findWhere({slug: slug});
      if (!item) {
        //try the visited items instead
        item = this.visitedItems.findWhere({slug: slug});
      }
      return item;
    },

    visitNext: function() {
      //record the next item as having been visited
      var next = this.unvisitedItems.shift();
      this.visitedItems.add(next);
    },

    // ItemsCollection of items the user has yet to visit
    unvisitedItems: null,

    // ItemsCollection of Items the user has already visited
    visitedItems: null,

  });

  return Session;

});
