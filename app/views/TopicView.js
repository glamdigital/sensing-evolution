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

                this.beaconsDict = {}
                //listen for events
                for(var i=0; i<this.items.length; i++) {
                    var item = this.items.at(i);
                    var eventID = 'beaconRange:' + item.attributes.beaconMajor;
                    this.listenTo(Backbone, eventID, this.didRangeBeacon);
                    console.log("listening for event: " + eventID);
                    this.beaconsDict[item.attributes.beaconMajor.toString()] = item;
                }
            },

            didRangeBeacon: function(data) {
                if(data.proximity === 'ProximityImmediate' || data.proximity == 'ProximityNear')
                {
                    //stop listening for the trigger event
                    var item = this.beaconsDict[data.major.toString()];
                    if(item==undefined) {
                        alert("undefined beacon in dict from data: " + data);
                    }
                    //route to appropriate page
                    Backbone.history.navigate('#/found/' + item.attributes.slug);
                }
            }

        });

        return TopicView;

    });