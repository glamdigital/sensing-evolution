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


var URLdirectory = {   '6650' : '/page1.html',
                    '00001' : '/page2.html'}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
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

app.initialize();

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
    logToDom("Initialising Beacons - pre delegate");

    var delegate = new cordova.plugins.locationManager.Delegate();
    logToDom("Initialising Beacons - post delegate");
    logToDom(delegate);

    var current_beacon = null;
    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        //is there a new beacon in Immediate range?

        logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        for(var i=0; i<pluginResult.beacons.length; i++) {
            var beacon = pluginResult.beacons[i];
            if(beacon.proximity == "ProximityImmediate" && (beacon.major != current_beacon)) {
                //look up new html page, and redirect
                var new_page = directory[beacon.major];
                current_beacon = beacon.major;
                window.location = new_page;
            }
        }
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
        logToDom('[DOM] did start monitoring for region: ' + JSON.stringify(pluginResult));
    }


    var beaconRegionUUID = '8492E75F-4FD6-469D-B132-043FE94921D8';
    try {
        var beaconRegion = cordova.plugins.locationManager.BeaconRegion("evo beacons", beaconRegionUUID, null, null);
    }
    catch (e) {
        logToDom("Exception creating beacon region");
        logToDom(e);
    }

    logToDom('About to start ranging beacons');
    try {
        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
            .success(logToDom)
            .fail(logToDom)
            .done();
    } catch (e) {
        logToDom("Exception starting ranging beacons");
        logToDom(e);
    }
    logToDom('Started ranging beacons');
};

