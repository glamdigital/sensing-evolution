define(["backbone", "underscore", "app/models/Trail", "app/views/AudioControlsView", "hbs!app/templates/trail_intro"],
    function(Backbone, _, Trail, AudioControlsView, trailIntro) {

    var TrailIntroView = Backbone.View.extend({
        template: trailIntro,

        initialize: function(params) {
            this.trail = params.trail;
            this.nextURL = params.nextURL;
            this.listenTo(Backbone, 'changed_floor', this.changedFloor);

	        var topics = this.trail.topics;

	        this.beaconsDict = {}
                //listen for events
                for(var i=0; i<topics.length; i++) {
                    var topic = topics.at(i);
	                //notification sound
	                if(typeof(Media) !== 'undefined') {
		                var pathPrefix = '';
		                if (device.platform.toLowerCase() === "android") {
			                pathPrefix = "/android_asset/www";
		                }
		                topic.notificationSound = new Media(pathPrefix + topic.attributes.notificationSound,
			                function () {
				                console.log("Created media object for notification");
			                },
			                function (error) {
				                console.log("error creating notification media object");
			                });
	                } else { console.log("Media plugin not available"); }

	                //register each entry point for the 'topic' (floor)
	                for (var j=0; j<topic.attributes.entryPointBeaconIDs.length; j++) {
	                    var major = topic.attributes.entryPointBeaconIDs[j];
		                var eventID = 'beaconRange:' + major;
	                    this.listenTo(Backbone, eventID, this.didRangeBeacon);
	                    console.log("listening for event: " + eventID);
	                    this.beaconsDict[major.toString()] = topic;
	                }

                }
        },

        afterRender: function() {
            if (this.trail.attributes.audio) {
                this.audioControls = new AudioControlsView({el:$('.audio-controls'),
                                                            audio: this.trail.attributes.audio,
                                                            caption: 'Trail Intro',
                                                            duration: this.trail.attributes.audio_duration});
	            this.audioControls.render();
            } else {
            }
        },

        serialize: function() {
            var out = {};
            out.trail = this.trail.toJSON();
            out.topics = this.trail.getTopics().toJSON();
            out.nextURL = this.nextURL;
            out.trail_slug = this.trail.attributes.slug;
            return out;
        },

        events: {
            "click #play-audio": "playAudio",
            "click #pause-audio": "pauseAudio",
            "click #restart-audio": "restartAudio",
            "click .play": "playAudio",
        },

        playAudio: function(ev) {
            if(this.audio) {
                this.audio.play();
                $('#play-audio').hide();
                $('#pause-audio').show();
                $('#restart-audio').show();
            }
        },

        pauseAudio: function(ev) {
            if(this.audio) {
                this.audio.pause();
            }
            $('#play-audio').show();
            $('#pause-audio').hide();
        },

        restartAudio: function(ev) {
            if(this.audio) {
                this.audio.currentTime = 0;
            }
        },

        showStartLink: function(ev) {
            ev.preventDefault();
            $('.start-trail').show();
            //add the 'finished' class to the video
            var $video = $('#intro-video');
            $video.addClass('finished');
            //hide the controls
            $video.removeAttr('controls');
        },

	    didRangeBeacon: function(data) {
            var topic = this.beaconsDict[data.major.toString()];
            if(topic == undefined) {
                alert("undefined beacon in dict from data: " + data);
                return;
            }

		    var $topicListEntry = $('#'+topic.attributes.slug);
            if($topicListEntry.length == 0) {
                alert("No item list entries found for item")
            }
            if(data.proximity === 'ProximityImmediate' || data.proximity == 'ProximityNear')
            {
                ////vibrate and play sound if this is a transition to near
                if(navigator.notification && !$topicListEntry.hasClass('nearby')) {
                    navigator.notification.vibrate(500);
		            topic.notificationSound.play();
                }

                //add class to item to make bg cycle
                $topicListEntry.addClass('nearby');
            }
            else {
                //remove class which makes bg cycle
                $topicListEntry.removeClass('nearby');
            }
        },

	    cleanup: function() {
		    if(this.audioControls) {
			    this.audioControls.remove();
		    }
	    }
    });

    return TrailIntroView;

});
