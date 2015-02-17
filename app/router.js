define(["backbone", "jquery", "underscore",
          "app/collections/TrailsCollection",
          "app/views/TrailsView", "app/views/ItemView", "app/views/FinishedView",
          "app/models/Session", "app/views/NavView", "app/views/DashboardView"],
  function(Backbone, $, _,
            TrailsCollection,
            TrailsView, ItemView, FinishedView,
            Session, NavView, DashboardView) {

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
            "home": "home",
            "trail/:trail": "trail",
            "item/:item": "item",
            "finished": "finished",
            "restart": "restart",
            "dashboard": "dashboard"
        },

        home: function() {
          var view = new TrailsView({
            el: $('#content'),
            trails:this.allTrails
          });
          view.render();
          this.navView.hide();
        },

        trail: function(trailSlug) {
          //create a new session for the chosen trail
          var trail = this.allTrails.findWhere( {slug: trailSlug} );
          this.session = new Session(trail);

          //create a navbar now we have a session
          this.navView = new NavView({el:$('#nav-menu'), session:this.session});
          this.navView.render();

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
          this.navView.render();
          view.render();
        },
        finished: function() {
          var view = new FinishedView( {el: $('#content')} );
          view.render();
            //TODO mark with the session that it's finished.
            //TODO re-render the nav menu
            //Hide the nav-menu
            this.navMenu.hide();
        },
        restart: function() {
          //restart the current trail
          this.session = new Session(this.session.attributes.trail.attributes.slug);
          Backbone.history.navigate(this.session.getNextURL());
        },
        dashboard: function() {
            var dashboardView = new DashboardView( {el: $('#content'), beaconId: 45790});
            dashboardView.render();
        },
    });

    return SEVRouter;

  });
