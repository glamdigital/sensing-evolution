define(["backbone", "underscore", "hbs!app/templates/item", "app/logging",
        "app/collections/QuestionsCollection", "app/views/QuestionView"],
    function(Backbone, _, itemTemplate, Logging, QuestionsCollection, QuestionView) {

  var ItemView = Backbone.View.extend({

    template: itemTemplate,

    serialize: function() {
      var output = this.item.toJSON();

      output.nextURL = this.nextURL;
      output.trailTitle = this.trail.attributes.title;
      output.topicTitle = this.topic.attributes.title;
      return output;
    },

    initialize: function(params) {
      this.item = params.item;
      this.nextURL = params.nextURL;
      this.trail = params.trail;
      this.topic = params.topic;
      this.question = params.item.questionForTrail(this.trail.attributes.slug);
      //listen for events
      this.eventId = 'beaconRange:' + this.item.attributes.beaconMajor;
      this.listenTo(Backbone, this.eventId, this.didRangeBeacon);
      Logging.logToDom("Listening for event: " + this.eventId);
      this.foundAtInit = params.found;
    },

    afterRender: function() {
      this.$media = $('#foundMedia');
      this.media = this.$media[0];

      var eventData = { question: this.question, url:this.nextURL };
      this.$media.on('ended',  eventData, this.onVideoEnded);

      if(this.foundAtInit) {
          this.findObject();
      }
    },

    didRangeBeacon: function(data) {
        Logging.logToDom("View heard about ranged beacon!");
      switch(data.proximity) {
        case "ProximityImmediate":
          //update proximity indicator
          $('.proximity-indicator').removeClass('near far').addClass('immediate').html('Immediate');
          this.findObject();
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
      $('.found-item').show().css('display', 'inline-block');
      $('.hint-container').hide();
      //start the video after half a second
      setTimeout( _.bind(function() {
        this.media.play();
      }, this), 500);
      //unsubscribe from further beacon events
      this.stopListening(Backbone, this.eventId);
      this.item.attributes.isFound=true;

      Backbone.trigger('found-item');
    },

    //For browser simulation of 'finding' the object. Click on the picture
    events: {
      "click img.item-image" : "onClickImage",
      "click .show-hint" : "showHint",
      "click #nav-menu-button" : "toggleNavMenu",
      // "ended #foundVideo" : "showQuestion"       //This doesn't appear to work. Need to bind in initialize instead.
    },
    onClickImage: function(ev) {
      Backbone.trigger(this.eventId, { proximity:"ProximityImmediate" });
    },
    showHint: function(ev) {
        ev.preventDefault();
      $('.show-hint').hide();
      $('.hint').show();
    },
    onVideoEnded: function(ev) {
      //create and render question view
      var questionView = new QuestionView({el: $('.question'), question:ev.data.question, nextURL:ev.data.url});
      questionView.render();
        //mark the media element as finished
        $(ev.target).parents('div').addClass("finished");
    },
    toggleNavMenu: function(ev)
    {
        var content = $('#content');
        content.toggleClass('slideout');
    }

    //allQuestions: allQuestions
  }
  );

  return ItemView;

});
