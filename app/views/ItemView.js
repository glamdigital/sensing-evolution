define(["backbone", "underscore", "hbs!app/templates/item", "app/location"], function(Backbone, _, itemTemplate, Location) {


  var ItemView = Backbone.View.extend({

    template: itemTemplate,

    serialize: function() {
      var output = this.item.toJSON();

      output.trailId = this.trailId;
      output.nextURL = this.nextURL;

      return output;
    },

    initialize: function(params) {
      this.item = params.item;
      this.trailId = params.trailId;
      this.nextURL = params.nextURL;

      //listen for events
      var eventId = 'beaconRange:' + this.item.attributes.iBeaconMajor;
      // this.on(eventId, this.didRangeBeacon, this);
      this.listenTo(Backbone, eventId, this.didRangeBeacon);
    },

    didRangeBeacon: function(proximity) {

      Location.logToDom("View received beacon event");

      switch(proximity) {
        case "ProximityImmediate":
          //update proximity indicator
          $('.proximity-indicator').removeClass('near far').addClass('immediate').html('Immediate');
          //find it
          //TODO
          break;
        case "ProximityNear":
          //update proximity indicator
          $('.proximity-indicator').removeClass('immediate far').addClass('near').html('Near');
          break;
        case "ProximityFar":
          //update proximity indicator
          $('.proximity-indicator').removeClass('immediate near far').html('Scanning...');
          break;
      }
    },

    events: {
      "click img" : "onClick"
    },
    onClick: function(ev) {
      //p = purple beacon
      //b = blue beacon
      //i = ios virtual beacon
      console.log(ev.which);
      Backbone.trigger("beaconRange:" + this.item.attributes.iBeaconMajor, "ProximityImmediate");
    },

  });

  return ItemView;

});
