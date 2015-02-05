define(["backbone", "jquery", "app/collections/TopicsCollection", "app/views/TopicsView"],
  function(Backbone, $, TopicsCollection, TopicsView) {

    var SEVRouter = Backbone.Router.extend({
        initialize: function() {
          //initialize the collections
          this.topicsCollection = new TopicsCollection();
          //'fetch' to init from local json file
          this.topicsCollection.fetch({
             error: function(coll, resp, opt) {
              console.log("error fetching topics: ");
              console.log(resp);
            },
            });

        },
        routes: {
            "": "home"
        },
        home: function() {
            var view = new TopicsView({
                el: $("#topics-list"),
                topics:this.topicsCollection
              });
        }
    });

    return SEVRouter;

  });
