/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


// Martin's iPhone
var URLdirectory = {   '6650' : 'page1.html',    //Martin's iphone
                    '26981' : 'page1.html'}      //icy marshmallow



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
        logToDom("Device Ready");
        logToDom("initialised");
        console.log("initialised");
        initIBeacons(URLdirectory);
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
    var e = document.createElement('label');
    e.innerText = message;

    var br = document.createElement('br');
    var br2 = document.createElement('br');
    document.body.appendChild(e);
    document.body.appendChild(br);
    document.body.appendChild(br2);

    window.scrollTo(0, window.document.height);
};


var initIBeacons = function (directory) {
    cordova.plugins.locationManager.requestAlwaysAuthorization();

    var delegate = new cordova.plugins.locationManager.Delegate();
    cordova.plugins.locationManager.setDelegate(delegate);

    var current_beacon = null;
    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        //is there a new beacon in Immediate range?

        //logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        for(var i=0; i<pluginResult.beacons.length; i++) {
            var beacon = pluginResult.beacons[i];
            if(beacon.proximity == "ProximityImmediate") {
                if(beacon.major != current_beacon) {
                    //look up new html page, and redirect
                    var new_page = directory[beacon.major];
                    logToDom("new page is: " + new_page);
                    current_beacon = beacon.major;
                    //window.location = new_page;
                    //trigger the 'found' event on the search item
                    $('search-item').trigger('found');
                }
            }
            else if (beacon.proximity == "ProimityNear") {
                logToDom("Beacon in Near Range!");
            }
        }
    };

    var beaconRegionUUID = '8492E75F-4FD6-469D-B132-043FE94921D8';  //Martin's iPhone
    var beaconRegionUUID = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';  //icy marshmallow
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

