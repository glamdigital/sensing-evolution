define(['backbone', 'hbs!app/templates/audio_controls'],
    function(Backbone, audioControlsTemplate) {

    Number.prototype.toMSS = function () {
	    var sec_num = Math.floor(this);
	    var minutes = Math.floor((sec_num ) / 60);
	    var seconds = sec_num - (minutes * 60);

	    if (seconds < 10) {seconds = "0"+seconds;}
	    var time = minutes+':'+seconds;
	    return time;
	}

    var AudioControlsView = Backbone.View.extend({

        template: audioControlsTemplate,

        initialize: function(params) {
            this.audio = params.audio;
            this.caption = params.caption;
	        this.duration = parseInt(params.duration).toMSS();

            this.toggleAudioPublic = _.bind(this.toggleAudio, this);

            //use Media plugin, for Android playback
            if(typeof(Media) !== 'undefined') {
                this.media_obj = new Media(this.getAudioURL(),
                    //success
                    //function () {alert("Successfully created audio object");},
	                null,
                    //failure
                    function (err) {
                    console.warn("Error from media object:" + err.code + " " + err.message );},
                    _.bind(this.audioStatus, this)
                );
            } else {
	            //alert("Media plugin not available!");
            }

            this.updateInterval = setInterval(this.updateElapsed.bind(this), 1000);
            this.isPlayingAudio = false;

        },

        serialize: function() {
            return {    audio: this.audio,
                        caption: this.caption,
                        duration: this.duration };
        },

        events: {
          "click #play-audio" : "playAudio",
          "click #pause-audio" : "pauseAudio",
          "click #restart-audio" : "restartAudio",
          "click .toggle-audio" : "toggleAudio"
        },

        getAudioURL: function() {
            path = 'audio/' + this.audio;
            if(device.platform.toLowerCase() === "android") {
                return "/android_asset/www/" + path;
            }
            return path;
        },
        updateControls: function(ev) {
            if (this.isPlayingAudio == true) {
                $('#play-audio').hide();
                $('#pause-audio').show();
                $('#restart-audio').show();
            }
            else {
                $('#play-audio').show();
                $('#pause-audio').hide();
            }
        },
        playAudio: function(ev) {
            if(this.media_obj) {
                this.media_obj.play();
            }
            else if(this.media) {
                this.media.play();
            }
        },

        pauseAudio: function(ev) {
            if(this.media_obj) {
                this.media_obj.pause();
            }
            else if(this.media) {
                this.media.pause();
            }

        },

        restartAudio: function(ev) {
            if(this.media_obj) {
                this.media_obj.seekTo(0);
	            $('#media-elapsed').html('0:00');
            }
            else if(this.media) {
                this.media.currentTime = 0;
            }
        },

        toggleAudio: function(ev) {
            if (this.isPlayingAudio == true) {
                this.pauseAudio();
            }
            else {
                this.playAudio();
            }
        },


        updateElapsed: function() {
            if(this.media_obj) {
	            this.media_obj.getCurrentPosition(function (elapsed) {
		            if (elapsed < 0) {
			            //not playing
			            return;
		            }
		            $('#media-elapsed').html(elapsed.toMSS());
	            });
            }
	    },

        audioStatus: function(status) {
            switch (status) {
                case Media.MEDIA_NONE: this.isPlayingAudio = false; break;
                case Media.MEDIA_STARTING: this.isPlayingAudio = true; break;
                case Media.MEDIA_RUNNING: this.isPlayingAudio = true; break;
                case Media.MEDIA_PAUSED: this.isPlayingAudio = false; break;
                case Media.MEDIA_STOPPED: this.isPlayingAudio = false; break;
            }
            this.updateControls();            
        },

        cleanup: function() {
            if(this.media_obj) {
	            console.log('releasing media object');
	            this.media_obj.stop();
                this.media_obj.release();
            }
	        clearInterval(this.updateInterval);
        }

    });

    return AudioControlsView;

});
