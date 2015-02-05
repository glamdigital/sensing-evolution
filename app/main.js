/**
 * Created by ahaith on 30/01/15.
 */
require(['jquery','backbone', 'app/router'], function($, Backbone, Router){

    console.log("In main. Creating router");

    var router = new Router();

    console.log("In main. Created router");

    //start the app
    Backbone.history.start();

});
