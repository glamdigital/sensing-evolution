define(["backbone", "jquery", "underscore",
          "app/collections/TrailsCollection", "app/collections/TopicsCollection", "app/collections/ItemsCollection",
          "app/views/TopicsView", "app/views/TrailsView", "app/views/ItemView",
          "app/models/Session"],
  function(Backbone, $, _,
            TrailsCollection, TopicsCollection, ItemsCollection,
            TopicsView, TrailsView, ItemView,
            Session) {

    var SEVRouter = Backbone.Router.extend({
        initialize: function() {
          //initialize the collections
          this.allTrails = new TrailsCollection();
          // this.allTopics = new TopicsCollection();
          // this.allItems = new ItemsCollection();

          //'fetch' to init from local json file
          // this.allTopics.fetch({
          //    success: function(coll, resp, opt) {
          //      _.shuffle(coll);
          //    },
          //    error: function(coll, resp, opt) {
          //     console.log("error fetching topics: ");
          //     console.log(resp);
          //   },
          // });
          this.allTrails.fetch({
            error: function(coll, resp, opt) {
              console.log("error fetching trails: ");
              console.log(resp);
            }
          });
          // this.allItems.fetch({
          //   success: function(coll, resp, opt) {
          //     _.shuffle(coll);
          //   },
          //   error: function(coll, resp, opt) {
          //     console.log("error fetching items: ");
          //     console.log(resp);
          //   }
          // });
        },
        routes: {
            "": "home",
            "trail/:trail": "trail",
            // "item/next": "next",
            "item/:item": "item",
            "finished": "finished"
        },
        home: function() {
          var view = new TrailsView({
            el: $('body'),
            trails:this.allTrails
          });
        },
        trail: function(trailSlug) {
          //create a new session for the chosen trail
          var trail = this.allTrails.findWhere( {slug: trailSlug} );
          this.session = new Session(trail);
          //go to the next item
          Backbone.history.navigate(this.session.getNextURL());
        },
        next: function() {
          if(this.session) {
            if(this.session.hasNext()) {
              //Show the ItemView for the next item
              var nextItem = this.session.getNext();
              var view = new ItemView({
                el:$('body'),
                item: nextItem,
                trailId: this.session.trailId
              });
              view.render();

              //mark the item as visited
              this.session.visitNext();
            }
            else {
              Backbone.history.navigate('#/finished');
            }
          }
        },
        item: function(itemSlug) {
          //get the topics for this trail

          // var view = new ItemView({
          //   el: $('body'),
          //   item: item,
          //   topicIndex: topicIndexi,
          //   itemIndex: itemIndexi,
          //   trailId: trailId
          // });
          //
          // view.render();

          var item = this.session.getItem(itemSlug);
          this.session.visitNext();
          var nextURL = this.session.getNextURL();
          var view = new ItemView({
            el: $('body'),
            item: item,
            nextURL: nextURL
          });
          view.render();

        },
        finished: function() {
          console.log("Trail is finished");
        }
    });

    return SEVRouter;

  });
