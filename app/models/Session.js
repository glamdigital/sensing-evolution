define(["backbone"], function(Backbone) {

  var Session = Backbone.Model.extend({

    initialize: function(trail) {

      this.trail = trail;

      //initialise the visited/unvisited collections
      this.visitedItems = new ItemsCollection();
      this.unvisitedItems = new ItemsCollection();

      //get all topics for the trail
      var topics = trail.getTopics();
      var shuffledTopics = topics.shuffle();

      //get all items for the topic, shuffle and add to unvisited items
      for(var i=0; i<topics.length; i++) {
        var topic = shuffledTopics[i];
        var items = topic.getItems();
        var shuffledItems = items.shuffle();
        for(var j=0; j<items.length; j++) {
          this.unvisitedItems.add(shuffledItems[j]);
        }
      }
    },

    hasNext: function() {
      //returns true if there is a next item
      return _.size(this.unvisitedItems);
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

    visitItem: function(slug) {
      //record the next item as having been visited
      var item = this.unvisitedItems.findWhere({slug: slug});
      this.unvisitedItems.remove(item);
      this.visitedItems.add(item);
    },

    // ItemsCollection of items the user has yet to visit
    unvisitedItems: null,

    // ItemsCollection of Items the user has already visited
    visitedItems: null,

  });

  return Session;

});
