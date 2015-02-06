/**
 * Created by ahaith on 30/01/15.
 */
require(['jquery','backbone', 'layoutmanager', 'app/router'], function($, Backbone, LayoutManager, Router){

    var router = new Router();

    Backbone.Layout.configure({ manage:true });

    //start the app
    Backbone.history.start();

});
