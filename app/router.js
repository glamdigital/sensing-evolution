define(["backbone", "jquery", "underscore",
          "app/collections/TrailsCollection", "app/collections/TopicsCollection", "app/collections/ItemsCollection",
          "app/views/TopicsView", "app/views/TrailsView", "app/views/ItemView"],
  function(Backbone, $, _,
            TrailsCollection, TopicsCollection, ItemsCollection,
            TopicsView, TrailsView, ItemView) {

    var SEVRouter = Backbone.Router.extend({
        initialize: function() {
          //initialize the collections
          this.allTrails = new TrailsCollection();
          this.allTopics = new TopicsCollection();
          _.shuffle(this.allTopics);
          this.allItems = new ItemsCollection();
          _.shuffle(this.allItems);

          //'fetch' to init from local json file
          this.allTopics.fetch({
             error: function(coll, resp, opt) {
              console.log("error fetching topics: ");
              console.log(resp);
            },
          });
          this.allTrails.fetch({
            error: function(coll, resp, opt) {
              console.log("error fetching trails: ");
              console.log(resp);
            }
          });
          this.allItems.fetch({
            error: function(coll, resp, opt) {
              console.log("error fetching items: ");
              console.log(resp);
            }
          });
        },
        routes: {
            "": "home",                                     //choose a trail
            ":trail/topic/:topicId/item/:itemID": "trail",  //i'th item in the jth topic in this trail
            "finished": "finished"                          //finished screen
        },
        home: function() {
          var view = new TrailsView({
            el: $('body'),
            trails:this.allTrails
          });
        },
        trail: function(trailId, topicIndex, itemIndex) {
          //get the topics for this index
          var topics = this.allTopics.where( {trail: trailId} );
          var topicIndexi = parseInt(topicIndex);
          if(topicIndexi >= topics.length) {
            //redirect to end page
            Backbone.history.navigate("#finished");
            return;
          }
          var topic = topics[topicIndexi];

          //get the item for this topic
          var items = this.allItems.where( {topic: topic.attributes.slug} );
          var itemIndexi = parseInt(itemIndex);
          if(itemIndexi >= items.length) {
            //redirect to first item of next topic
            topicIndex++;
            itemIndex = 0;
            var url = '#/' + trailId + '/topic/' + topicIndex + '/item/' + itemIndex;
            Backbone.history.navigate(url);
            return;
          }
          var item = items[itemIndexi];

          var view = new ItemView({
            el: $('body'),
            item: item,
            topicIndex: topicIndexi,
            itemIndex: itemIndexi,
            trailId: trailId
          });

          view.render();
        },
        finished: function() {
          console.log("Trail is finished");
        }
    });

    return SEVRouter;

  });
