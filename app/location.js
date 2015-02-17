define(["backbone", "underscore"], function(Backbone, _ ) {

  var log_to_dom_enabled = true;
  var logToDom = function (message) {
      if(log_to_dom_enabled) {
          console.log("Logging to dom");
          var e = document.createElement('label');
          e.innerText = message;

          var br = document.createElement('br');
          var br2 = document.createElement('br');
          document.body.appendChild(e);
          document.body.appendChild(br);
          document.body.appendChild(br2);

          //window.scrollTo(0, window.document.height);
      }
  };

  // if(typeof(cordova)=='undefined') {
  //   var LocationDummy = {
  //     init: function() {
  //        console.log("Initialised dummy location service");
  //        logToDom("Initialised dummy location service");
  //        },
  //     startRangingRegion: function(uuid) { console.log("Started ranging in region: " + uuid);},
  //     stopRangingRegion: function(uuid) { console.log("Stopped ranging in region: " + uuid);},
  //     logToDom: function(message) {logToDom(message);}
  //
  //   };
  //   logToDom("Cordova not defined. Beacon ranging service will not be available");
  //   return LocationDummy;
  // }

  var Location = {
    init: function() {

      //register delegate
      try {
        window.cordova.plugins.locationManager.requestWhenInUseAuthorization();

        this.delegate = new window.cordova.plugins.locationManager.Delegate();
        window.cordova.plugins.locationManager.setDelegate(this.delegate);
        this.delegate.didRangeBeaconsInRegion = this.handleRangedBeacons;

        logToDom("Started location service");
      } catch (e) {
        logToDom("Exception initialising beacons");
        logToDom(e.message);
      }
    },

    startRangingRegion: function(uuid) {
      try {
        var beaconRegion = new window.cordova.plugins.locationManager.BeaconRegion("evo beacons", uuid);
        window.cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion);
      } catch (e) {
        logToDom("Error starting ranging: " + e.message);
      }
    },

    stopRangingRegion: function(uuid) {
      // window.cordova.plugins.locationManager.stop...
    },

    //this function will be assigned as the callback for the location service plugin
    //Called with a full set of beacons
    handleRangedBeacons: function (data) {

      //loop over all ranged beacons
      for(var i=0; i<data.beacons.length; i++) {

        var beacon = data.beacons[i];

        //emit events in form 'beaconRange:<majorID>'
        var eventID = 'beaconRange:' + beacon.major;

        var beacon_data = {proximity: beacon.proximity, rssi: beacon.rssi, accuracy: beacon.accuracy};
        Backbone.trigger(eventID, beacon_data);

      }
    },

    logToDom: function(message) {
      logToDom(message);
    }

  };

  return Location;

});
