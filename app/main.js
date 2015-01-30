/**
 * Created by ahaith on 30/01/15.
 */
require(['jquery','backbone'], function($, Backbone){
    $(function() {


    });

    var SEVRouter = Backbone.Router.extend({
        routes: {
            "": "home"
        },
        home: function() {
            console.log("Routed to home");
        }
    });

    var router = new SEVRouter();

    //start the app
    Backbone.history.start();

});