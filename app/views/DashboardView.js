define(["backbone", "jquery", "hbs!app/templates/dashboard", "app/location"], function(Backbone, $, dashboardTemplate, Location) {

    var DashboardView = Backbone.View.extend({

        template: dashboardTemplate,

        initialize: function (params) {
            this.beacons = params;

            //set some default values for the min and max
            this.minRSSI = -100;
            this.maxRSSI = -25;

            this.minAccuracy = 0;
            this.maxAccuracy = 5;


        },

        serialize: function() {
            return { beaconId: this.beaconId};
        },

        afterRender: function() {

            //update labels
            $('#rssi').find('.min').html(this.minRSSI);
            $('#rssi').find('.max').html(this.maxRSSI);

            var $acc = $('#accuracy.meter');
            var $accuracies = $('#accuracies');
            var $rssi = $('#rssi.meter');
            var $rssis = $('#rssis');
            $acc.find('.min').html(this.minAccuracy);
            $acc.find('.max').html(this.maxAccuracy);

            for(var i=0; i<this.beacons.length; i++) {
                beaconId = this.beacons[i].beaconId;

                //this.eventIds.push(eventId);
                //subscribe to event
                this.listenTo(Backbone, this.eventId, this.didRangeBeacon);

                //duplicate the rssi and accuracy elements
                $acc.clone().appendTo($accuracies).addClass(beaconId).prepend(this.beacons[i].name);
                $rssi.clone().appendTo($rssis).addClass(beaconId).prepend(this.beacons[i].name);
            }

            $acc.hide();
            $rssi.hide();
        },

        events: {
            "click .meter" : "simulateRange"
        },

        simulateRange: function () {
            var randomAccuracy = this.minAccuracy + Math.random() * (this.maxAccuracy - this.minAccuracy);
            var randomRSSI = this.minRSSI + Math.random() * (this.maxRSSI - this.minRSSI);
            var randomProximity = randomAccuracy > 40 ? "FarProximity" : randomAccuracy > 10 ? "NearProximity" : "ImmediateProximity";
            Backbone.trigger(this.eventId, {proximity: randomProximity, rssi: randomRSSI, accuracy: randomAccuracy});
        },

        didRangeBeacon: function(data) {
            //update the bars on the screen


            //rssi
            var $rssi = $('#rssi.' + beacon.major);
            var fill = 1 - (this.maxRSSI - data.rssi) / (this.maxRSSI - this.minRSSI);
            $rssi.find(".fillBar").css("width", fill*100 + "%");
            $rssi.find(".value").html(data.rssi);

            //accuracy
            var $accuracy = $('#accuracy.' + beacon.major);
            var fill2 = 1 - (this.maxAccuracy - data.accuracy) / (this.maxAccuracy - this.minAccuracy);
            $accuracy.find(".fillBar").css("width", fill*100 + "%");
            $accuracy.find(".value").html(data.accuracy);

            switch(data.proximity) {
                case "ProximityImmediate":
                    $('.fillBar').addClass("immediate").removeClass("far").removeClass("near");
                    break;
                case "ProximityNear":
                    $('.fillBar').addClass("near").removeClass("immediate").removeClass("far");
                    break;
                case "ProximityFar":
                    $('.fillBar').addClass("far").removeClass("immediate").removeClass("near");
                    break;
            }
        }
    });

    return DashboardView;

});
