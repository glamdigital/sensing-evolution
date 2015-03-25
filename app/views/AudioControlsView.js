define(['backbone', 'hbs!app/templates/audio_controls'],
    function(Backbone, audioControlsTemplate) {

    var AudioControlsView = Backbone.View.extend({

        template: audioControlsTemplate,

        initialize: function(params) {
            this.audio = params.audio;
            this.caption = params.caption;
        },

        serialize: function() {
            return { audio: this.audio, caption: this.caption };
        },

        afterRender: function() {
            this.$media = $('#media');
            this.media = this.$media[0];
        },

        events: {
          "click #play-audio" : "playAudio",
          "click #pause-audio" : "pauseAudio",
          "click #restart-audio" : "restartAudio",
        },

       playAudio: function(ev) {
            if(this.media) {
                this.media.play();
                $('#play-audio').hide();
                $('#pause-audio').show();
                $('#restart-audio').show();
            }
        },

        pauseAudio: function(ev) {
            if(this.media) {
                this.media.pause();
            }
            $('#play-audio').show();
            $('#pause-audio').hide();
        },

        restartAudio: function(ev) {
            if(this.media) {
                this.media.currentTime = 0;
            }
        },


    });

    return AudioControlsView;

});
