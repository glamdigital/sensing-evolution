define(["backbone", "app/models/Trail", "hbs!app/templates/trail_intro"],
    function(Backbone, Trail, trailIntro) {

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
            var videoPath = (device.platform == 'Android' || device.platform == 'amazon-fireos') ? '' : 'video/'
	        console.log("Initializing video");
            window.plugins.html5Video.initialize({
                "introvideo" : videoPath + this.trail.attributes.video,
            });
			console.log(window.plugins.html5Video._videos);

            setTimeout(this.startVideo.bind(this), 2000);
            this.$video.on('ended', this.showStartLink);

        },
        startVideo: function() {
	        console.log("Playing video");
            window.plugins.html5Video.play('introvideo', this.showStartLink);
        },
        serialize: function() {
            var out = this.trail.toJSON();
            out.nextURL = this.nextURL;
            return out;
        },

        showStartLink: function() {
            $('.buttons-container').show();
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

    return TrailIntroView;

});
