//Assuming each 'component'/'topic' has a finite set of unique entry points
//we can keep track of where the user is.
//This module retrieves beacon IDs from all 'topics'(/components) and

define(['app/logging', 'backbone', 'underscore', 'app/models/trail'],
    function(Logging, Backbone, _, Trail) {
        var FloorTracking = Backbone.Model.extend(
            {
            initialize : function(topics) {
                //subscribe to relevant beacon events
                topics.each( function(topic) {
                    for(var i=0; i<topic.attributes.entryPointBeaconIDs.length; i++)
                    var beaconID = topic.attributes.entryPointBeaconIDs[i]
                    var eventId = 'beaconRange:' + beaconID;
                    this.listenTo(Backbone, eventId, this.beaconRanged);
                    this.beaconsDict[beaconID.toString()] = topic;
                }, this);
                this.currentlyRequestingSwitch = false;
            },

            beaconRanged: function(data) {
                //if we're near to a beacon that's different than the current one
                if(data.proximity === "ProximityImmediate" || data.proximity === "ProximityNear") {
                    if(this.currentTopic===null || this.currentTopic.attributes.entryPointBeaconIDs.indexOf(data.major.toString()) < 0) {
                        //This is a new floor. update current floor and emit a message
                        this.currentTopic = this.beaconsDict[data.major.toString()];
                        Backbone.trigger('changed_floor', this.currentTopic.attributes.slug);
                        if(FloorTracking.promptToSwitch && !this.currentlyRequestingSwitch) {
                            this.promptToSwitchFloor();
                            this.currentlyRequestingSwitch = true;
                        }
                    }
                }
            },
            promptToSwitchFloor: function(floorSlug) {
                var title = "Entering " + this.currentTopic.attributes.title;
                var message = "Switch to this area?";
                var buttonLabels = ['Not now', 'OK'];
                if (navigator.notification) {
                    navigator.notification.confirm(message, _.bind(this.userChoseToSwitchFloor, this),
                title, buttonLabels);
                }
                else
                {
                    //desktop browser testing, just switch
                    this.userChoseToSwitchFloor(2);
                }
            },
            userChoseToSwitchFloor: function(buttonIndex) {
                if(buttonIndex == 2) {
                    Backbone.history.navigate('#/topic/' + this.currentTopic.attributes.slug);
                }
                //enable another floor switch in a few seconds
                setTimeout(this.setNotRequestingSwitch.bind(this), 3000);
            },
            setNotRequestingSwitch: function() {
                this.currentlyRequestingSwitch = false;
            },

            currentTopic: null,
            beaconsDict: {}
        },
            {
                //Class attribute enabled flag. Can be enabled/disabled by views
                promptToSwitch:true
            }
        );

        return FloorTracking;
    });
