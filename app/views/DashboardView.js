define(["backbone", "jquery", "hbs!app/templates/dashboard", "app/location"], function(Backbone, $, dashboardTemplate, Location) {

    var DashboardView = Backbone.View.extend({

        template: dashboardTemplate,

        initialize: function (params) {
            this.beaconId = params.beaconId;
            this.eventId = 'beaconRange:' + this.beaconId;

            //subscribe to event
            this.listenTo(Backbone, this.eventId, this.didRangeBeacon);

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

            var $acc = $('#accuracy').find('.min');
            $acc.html(this.minAccuracy);
            $('#accuracy').find('.max').html(this.maxAccuracy);
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
            var fill = 1 - (this.maxRSSI - data.rssi) / (this.maxRSSI - this.minRSSI);
            $('#rssi').find(".fillBar").css("width", fill*100 + "%");
            $('#rssi').find(".value").html(data.rssi);

            //accuracy
            var fill2 = 1 - (this.maxAccuracy - data.accuracy) / (this.maxAccuracy - this.minAccuracy);
            $('#accuracy').find(".fillBar").css("width", fill*100 + "%");
            $('#accuracy').find(".value").html(data.accuracy);

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
