define(['backbone', 'hbs!app/templates/trail_instructions'],
        function(Backbone, trailInstructionsTemplate) {

    var TrailInstructionsView = Backbone.View.extend({

        template: trailInstructionsTemplate,

        initialize: function(params) {
            this.trail = params.trail;
        },

        serialize: function() {
            return this.trail.toJSON();
        }

    });

    return TrailInstructionsView;

});