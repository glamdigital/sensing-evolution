define(["backbone", "underscore", "app/views/vcentre", "app/models/Trail", "hbs!app/templates/trail_intro"],
    function(Backbone, _, CentreMixin, Trail, trailIntro) {

    var TrailIntroView = Backbone.View.extend({
        template: trailIntro,

        initialize: function(params) {
            this.trail = params.trail;
            this.isAndroid = (typeof(device) !== 'undefined') &&   (device.platform == 'Android' || device.platform == 'amazon-fireos');
            if(typeof(device)!='undefined') {
              this.videoPath = this.isAndroid ? 'file:///android_asset/www/video/' : 'video/'
            }
        },

        afterRender: function() {
            this.$video = $('#introvideo');
            this.video = this.$video[0];

            //start video on first play - the start 'control' doesn't work due to video plugin
            this.$video.one('click', function(ev){
              this.startVideo();
            }.bind(this));

            this.playing = false;
            this.$video.on('ended', this.showStartLink.bind(this));
            this.$video.on('seeked', function(ev) {
              if(!ev.target.ended) {
                this.hideStartLink();
              }
            }.bind(this));
        },
        
        startVideo: function() {
          if (this.isAndroid) {
            $("#android-video-overlay").hide();
            VideoPlayer.play(this.videoPath +this.trail.attributes.video);
            setTimeout(this.showStartLink, 500);
          } else {
            this.video.play();
          }

        },
        serialize: function() {
            var out = this.trail.toJSON();
            out.isAndroid = this.isAndroid;
            return out;
        },

        showStartLink: function() {
          var $buttonsContainer = $('.buttons-container');
            $buttonsContainer.show();
            //this.moveToCentre($buttonsContainer);
            //add the 'finished' class to the video
            var $video = $('#introvideo');
            $video.hide();
        },

        hideStartLink: function() {
          console.log("hideStartLink");
          //hide nav controls
          $('.buttons-container').hide();

          //unhide video controls
          $('.controls-container').show();
          $('.stop').show();
          this.$video.show();
        },

        replayVideo: function(ev) {
          if (this.isAndroid) {
            VideoPlayer.play(this.videoPath +this.trail.attributes.video);
          } else {
            this.$video.show();
            ev.preventDefault();
        
            //window.plugins.html5Video.play('introvideo');
            this.$video[0].play();
            this.hideStartLink();
          }
        },
        
        events: {
          "click #replay": "replayVideo",
	        "click #pause": "pauseVideo",
	        "click #resume": "resumeVideo",
	        "click #stop": "stopVideo",
          "click #android-video-overlay": "startVideo",
        }
    });

    //_.extend(TrailIntroView.prototype, CentreMixin);

    return TrailIntroView;

});
