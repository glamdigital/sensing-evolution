define(["backbone", "app/collections/ItemsCollection", "app/collections/TopicsCollection", "app/models/Trail"],
    function(Backbone, ItemsCollection, TopicsCollection, Trail) {

  var Session = Backbone.Model.extend({

    initialize: function(trail) {

      this.trail = trail;

      //initialise the visited/unvisited collections
      this.visitedItems = new ItemsCollection();
      this.unvisitedItems = new ItemsCollection();

      //get all topics for the trail
      this.topics = trail.getTopics();
      this.shuffledTopics = new TopicsCollection(this.topics.shuffle());

      //get all items for the topic, shuffle and add to unvisited items
      for(var i=0; i<this.shuffledTopics.length; i++) {
        var topic = this.shuffledTopics.at(i);
        var items = topic.getItems();
        topic.shuffledItems = new ItemsCollection(items.shuffle());
        for(var j=0; j<items.length; j++) {
          this.unvisitedItems.add(topic.shuffledItems.at(j));
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
      this.currentItem = item;
      this.currentTopic = Trail.allTopics.findWhere({slug: item.attributes.topic});
      return item;
    },

    getCurrentTopic: function() {
      return this.currentTopic;
    },

    getCurrentTrail: function() {
      return this.trail;
    },

    visitItem: function(slug) {
      //record the next item as having been visited
      var item = this.unvisitedItems.findWhere({slug: slug});
      this.unvisitedItems.remove(item);
      this.visitedItems.add(item);
    },

    getAllSessionTopicsAndItems: function() {
        var out = {
            title: this.trail.attributes.name,
            topics: []
        };

        this.shuffledTopics.each( function(topic) {
            var isCurrentTopic = this.currentTopic === topic;
            var topicDict = {
                title: topic.attributes.title,
                items: [],
                isCurrent: isCurrentTopic
            };
            //fill in items
            var items = topic.shuffledItems;
            items.each(function(item) {
                var isCurrentItem = this.currentItem === item;
                var isVisited = this.visitedItems.indexOf(item) >= 0;
                //TODO track whether an item has been found
                var itemDict = {
                    title: item.attributes.title,
                    slug: item.attributes.slug,
                    isCurrent: isCurrentItem,
                    isVisited: isVisited,
                    isFound: item.attributes.isFound,
                };
                topicDict.items.push(itemDict);
            }, this);
            out.topics.push(topicDict);
        }, this);

        return out;

    },

    // ItemsCollection of items the user has yet to visit
    unvisitedItems: null,

    // ItemsCollection of Items the user has already visited
    visitedItems: null,

  });

  return Session;

});
