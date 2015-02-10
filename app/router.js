define(["backbone", "jquery", "underscore",
          "app/collections/TrailsCollection",
          "app/views/TrailsView", "app/views/ItemView", "app/views/FinishedView",
          "app/models/Session"],
  function(Backbone, $, _,
            TrailsCollection,
            TrailsView, ItemView, FinishedView,
            Session) {

    var SEVRouter = Backbone.Router.extend({
        initialize: function() {
          //initialize the collections
          this.allTrails = new TrailsCollection();
          this.allTrails.fetch({
            error: function(coll, resp, opt) {
              console.log("error fetching trails: ");
              console.log(resp);
            }
          });
        },

        routes: {
            "": "home",
            "trail/:trail": "trail",
            "item/:item": "item",
            "finished": "finished",
            "restart": "restart"
        },

        home: function() {
          var view = new TrailsView({
            el: $('#content'),
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

        item: function(itemSlug) {
          var item = this.session.getItem(itemSlug);
          //Inform the session that we've visited this item
          this.session.visitItem(itemSlug);
          var nextURL = this.session.getNextURL();
          var currentTrail = this.session.getCurrentTrail();
          var currentTopic = this.session.getCurrentTopic();
          var view = new ItemView({
            el: $('#content'),
            item: item,
            trail: currentTrail,
            topic: currentTopic,
            nextURL: nextURL
          });
          view.render();

        },
        finished: function() {
          var view = new FinishedView( {el: $('body')} );
          view.render();
        },
        restart: function() {
          //restart the current trail
          this.session = new Session(this.session.attributes.trail.attributes.slug);
          Backbone.history.navigate(this.session.getNextURL());
        }
    });

    return SEVRouter;

  });
