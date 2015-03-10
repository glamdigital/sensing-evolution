define(["backbone", "hbs!app/templates/topic"],
    function(Backbone, topicTemplate) {

        var TopicView = Backbone.View.extend({
            template: topicTemplate,

            serialize: function() {
                //serialize trail, topic and items
                var out = {};
                out.trail = this.trail.toJSON();
                out.topic = this.topic.toJSON();
                out.items = this.items.toJSON();
                return out;
            },

            initialize: function(params) {
                this.trail = params.trail;
                this.topic = params.topic;
                this.items = this.topic.getItemsForTrail(this.trail.attributes.slug);
            }

        });

        return TopicView;

    });