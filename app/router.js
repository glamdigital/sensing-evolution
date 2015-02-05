define(["backbone", "jquery"],
  function(Backbone, $) {

    console.log("Making router");

    var SEVRouter = Backbone.Router.extend({
        // routes: {
        //     "": "home"
        // },
        // home: function() {
        //     console.log("Routed to home");
        //     $('body').append("ROUTED TO HOME");
        // }
    });

    return SEVRouter;

  });
