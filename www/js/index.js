var beaconRegionUUID_ios = '8492E75F-4FD6-469D-B132-043FE94921D8';  //estimote iOS app'
var beaconRegionUUID_icy = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';  //icy marshmallow

// Until we can manually set the UUID of a beacon, the UUID we are looking for
// must be hard-coded here to whatever the demonstration beacon is currently using
var beaconRegionUUID = beaconRegionUUID_ios;

// Set this to true to enable the logs to the DOM
var log_to_dom_enabled = false;

var app = {
    // Application Constructor
    initialize: function() {
        logToDom("Intialising app");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        logToDom("Binding events");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        logToDom("initialised");
        console.log("initialised");
        initIBeacons();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(function() {
    app.initialize();
});


var logToDom = function (message) {

    if(log_to_dom_enabled) {
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


var initIBeacons = function () {
    cordova.plugins.locationManager.requestWhenInUseAuthorization();

    var delegate = new cordova.plugins.locationManager.Delegate();
    cordova.plugins.locationManager.setDelegate(delegate);

    var current_beacon = null;
    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        //is there a new beacon in Immediate range?
        for(var i=0; i<pluginResult.beacons.length; i++) {
            var beacon = pluginResult.beacons[i];
            if(beacon.proximity == "ProximityImmediate") {
                if(beacon.major != current_beacon) {
                    logToDom("found iBeacon, with major: " + beacon.major);
                    current_beacon = beacon.major;

                    //trigger that the object has been found.
                    $('.search-item').trigger('found');
                }
            }
        }
    };

    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion("evo beacons", beaconRegionUUID);

    try {
        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
            .fail(logToDom)
            .done();
    } catch (e) {
        logToDom("Exception starting ranging beacons");
    }

    logToDom("Now scanning for beacons");
};

