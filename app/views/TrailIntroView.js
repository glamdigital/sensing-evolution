define(["backbone", "underscore", "app/models/Trail", "hbs!app/templates/trail_intro"],
    function(Backbone, _, Trail, trailIntro) {

    var TrailIntroView = Backbone.View.extend({
        template: trailIntro,

        initialize: function(params) {
            this.trail = params.trail;
            this.nextURL = params.nextURL;
            this.listenTo(Backbone, 'changed_floor', this.changedFloor);
        },

        afterRender: function() {
            this.$video = $('#intro-video');
            this.video - this.$video[0];

            this.$video.on('ended', this.showStartLink);
            if (this.trail.attributes.audio) {
                this.audio = $('audio')[0];
            }
        },

        serialize: function() {
            var out = {}
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
                this.audio.play();
            }
            $('#play-audio').hide();
            $('#pause-audio').show();
        },

        showStartLink: function(ev) {
            ev.preventDefault();
            $('.start-trail').show();
            //add the 'finished' class to the video
            var $video = $('#intro-video');
            $video.addClass('finished');
            //hide the controls
            $video.removeAttr('controls');
        }
    });

    return TrailIntroView;

});
