/**
 * Created by ahaith on 30/01/15.
 */
require(['jquery','backbone', 'app/logging', 'layoutmanager', 'app/router', 'app/location',
        'app/test/validateData', 'app/models/Trail', 'app/models/Topic', 'app/models/Item'],
  function($, Backbone, Logging, LayoutManager, Router, Location, Tests, Trail, Topic, Item){

    //UUIDs to monitor
    //TODO move this to config
    var Location_UUID_beacons = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'; //beacons
    var Location_UUID_ios = '8492E75F-4FD6-469D-B132-043FE94921D8'; //ios

    var onReady = function() {
      Logging.logToDom("Device Ready");
      Location.init();
      Location.startRangingRegion(Location_UUID_ios);
      Location.startRangingRegion(Location_UUID_beacons);
    };

    //start the location service when the device is ready
    document.addEventListener('deviceready', onReady, false);

    Backbone.Layout.configure({ manage:true });

    Item.loadQuestions( function() {
      Topic.loadItems( function() {
        Trail.loadTopics( function() {
            var router = new Router();
            //start the app
            Backbone.history.start();
            Logging.logToDom("Started the app");
          });
      });
    });

});
