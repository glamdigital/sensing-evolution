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
        },

        serialize: function() {
            var out = {}
            out.trail = this.trail.toJSON();
            out.topics = this.trail.getTopics().toJSON();
            out.nextURL = this.nextURL;
            out.trail_slug = this.trail.attributes.slug;
            return out;
        },

        showStartLink: function() {
            $('.start-trail').show();
            //add the 'finished' class to the video
            var $video = $('#intro-video');
            $video.addClass('finished');
            //hide the controls
            $video.removeAttr('controls');
        },
          changedFloor: function(slug) {
              ////remove the 'near' class from all items
              //  var items = $('.topic-list-item');
              //items.removeClass('near');
              //
              ////add the 'near' class to the new current floor
              //var nearItem = $('#' + slug);
              //nearItem.addClass('near');
              var topic = Trail.allTopics.findWhere({slug:slug});
              var title = "Entering " + topic.attributes.title;
              var message = "Switch to this area?";
              var buttonLabels = ['Not now', 'OK'];
              this.newFloorSlug = slug;
              navigator.notification.confirm(message,
                  _.bind(this.userChoseToSwitchFloor, this),
                  title,
                  buttonLabels
              );
          },
        userChoseToSwitchFloor: function(buttonIndex) {
          if(buttonIndex == 2 ) {
              Backbone.history.navigate('#/topic/' + this.newFloorSlug);
          }
        },
    });

    return TrailIntroView;

});
