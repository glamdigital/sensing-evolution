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
      this.eventId = 'beaconRange:' + this.item.attributes.iBeaconMajor;
      // this.on(eventId, this.didRangeBeacon, this);
      this.listenTo(Backbone, this.eventId, this.didRangeBeacon);
    },

    afterRender: function() {
      this.$video = $('#foundVideo');
      this.video = this.$video[0];

      this.$video.on('ended', this.onVideoEnded);
    },

    didRangeBeacon: function(proximity) {
      switch(proximity) {
        case "ProximityImmediate":
          //update proximity indicator
          $('.proximity-indicator').removeClass('near far').addClass('immediate').html('Immediate');
          this.findObject();
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

    findObject: function() {
      $('.search-item').hide();
      $('.found-item').show();
      $('.hint-container').hide();
      //start the video after half a second
      setTimeout( _.bind(function() {
        this.video.play();
      }, this), 500);
      //unsubscribe from further beacon events
      this.stopListening(Backbone, this.eventId);
    },

    //For browser simulation of 'finding' the object. Click on the picture
    events: {
      "click img" : "onClickImage",
      "click .show-hint" : "showHint",
      "ended #foundVideo" : "onVideoEnded"
    },
    onClickImage: function(ev) {
      Backbone.trigger(this.eventId, "ProximityImmediate");
    },
    showHint: function(ev) {
      $('.show-hint').hide();
      $('.hint').show();
    },
    onVideoEnded: function() {
      Location.logToDom("Video ended");
    }

  });

  return ItemView;

});
