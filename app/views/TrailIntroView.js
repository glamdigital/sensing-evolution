define(["backbone", "app/models/Trail", "hbs!app/templates/trail_intro"],
    function(Backbone, Trail, trailIntro) {

    var TrailIntroView = Backbone.View.extend({
        template: trailIntro,

        initialize: function(params) {
            this.trail = params.trail;
            this.nextURL = params.nextURL;
        },

        afterRender: function() {
            this.$video = $('#intro-video');
            this.video - this.$video[0];

            this.$video.on('ended', this.showStartLink);
        },

        serialize: function() {
            var out = this.trail.toJSON();
            out.nextURL = this.nextURL;
            return out;
        },

        showStartLink: function() {
            $('.start-trail').show();
        }

    });

    return TrailIntroView;

});
