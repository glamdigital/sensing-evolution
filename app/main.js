/**
 * Created by ahaith on 30/01/15.
 */
require(['jquery','backbone', 'app/logging', 'layoutmanager', 'app/router', 'app/location',
        'app/test/validateData', 'app/models/Trail', 'app/models/Topic', 'app/models/Item', 'app/collections/TrailsCollection'],
  function($, Backbone, Logging, LayoutManager, Router, Location, Tests, Trail, Topic, Item, TrailsCollection){

    //UUIDs to monitor
    //TODO move this to config
    var Location_UUID_beacons = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'; //beacons
    var Location_UUID_ios = '8492E75F-4FD6-469D-B132-043FE94921D8'; //ios

    var onReady = function() {
      Logging.logToDom("Device Ready");
      Location.init();
      Location.startRangingRegion(Location_UUID_ios);
      Location.startRangingRegion(Location_UUID_beacons);
        console.log("Device ready");
    };

    //start the location service when the device is ready
    document.addEventListener('deviceready', onReady, false);

    Backbone.Layout.configure({ manage:true });

    Item.loadQuestions( function() {
      Topic.loadItems( function() {
        Trail.loadTopics( function() {
            var router = new Router();
            //start the app
            //register all videos
            Backbone.history.start();
            Logging.logToDom("Started the app");

                allTrails = new TrailsCollection();
                allTrails.fetch({
                    error: function(coll, resp, opt) {
                        console.log("error fetching trails: ");
                        console.log(resp);
                    },
                    success: function(coll, resp, opt)
                    {
                        //get all videos from
                        register_videos(coll, Topic.allItems);
                    }.bind(this)
                });

                //register id-file relationships withe the html5 video plugin
                var registerVideos = function() {
                    var trails = new TrailsCollection();
                    var items = Topic.AllItems;
                }

          });
      });
    });

    var register_videos = function(allTrails, allItems) {
        console.log("Registering videos");
        var videos = {};
        //build a dictionary of all videos - each trail intro and each item found video
        allTrails.each(function(trail) {
            videos[trail.attributes.slug] = trail.attributes.video;
        }.bind(this));

        Topic.allItems.each(function(item) {
            videos[item.attributes.slug] = item.attributes.video;
        }.bind(this));

        //window.plugins.html5Video.initialize(videos);
    };

});
