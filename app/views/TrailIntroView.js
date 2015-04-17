define(["backbone", "underscore", "app/views/vcentre", "app/models/Trail", "hbs!app/templates/trail_intro"],
    function(Backbone, _, CentreMixin, Trail, trailIntro) {

    var TrailIntroView = Backbone.View.extend({
        template: trailIntro,

        initialize: function(params) {
            this.trail = params.trail;
            this.nextURL = params.nextURL;
        },

        afterRender: function() {
            this.$video = $('#introvideo');
            this.video = this.$video[0];

            //initiailize the video plugin
            //on Android the videos must be loose in res/raw/, where the plugin plays them, on ios they are in www/video'
	        if(typeof(device)!='undefined') {
		        var videoPath = (device.platform == 'Android' || device.platform == 'amazon-fireos') ? '' : 'video/'
		        console.log("Initializing video");
		        window.plugins.html5Video.initialize({
			        "introvideo": videoPath + this.trail.attributes.video,
		        });
	        }

            setTimeout(this.startVideo.bind(this), 5000);
            this.$video.on('ended', this.showStartLink.bind(this));

			setTimeout(this.centreElements.bind(this), 100);
        },
	    centreElements: function() {
	        this.moveToCentre(this.$video);
	    },
        startVideo: function() {
	        console.log("Playing video");
	        if(typeof(device)!='undefined') {
		        window.plugins.html5Video.play('introvideo', this.showStartLink);
	        } else {
		        this.video.play();
	        }
        },
        serialize: function() {
            var out = this.trail.toJSON();
            out.nextURL = this.nextURL;
            return out;
        },

        showStartLink: function() {
	        var $buttonsContainer = $('.buttons-container');
            $buttonsContainer.show();
            this.moveToCentre($buttonsContainer);
            //add the 'finished' class to the video
            var $video = $('#intro-video');
        },

        replayVideo: function(ev) {
          ev.preventDefault();
          window.plugins.html5Video.play('introvideo');

            //hide controls
            $('.buttons-container').hide();
        },

        events: {
            "click #replay": "replayVideo"
        }


    });

    _.extend(TrailIntroView.prototype, CentreMixin);


    return TrailIntroView;

});
