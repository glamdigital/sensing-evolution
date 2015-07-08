define(["backbone", "hbs!app/templates/finished"], function(Backbone, finishedTemplate) {

  var FinishedView = Backbone.View.extend({

    template: finishedTemplate,

    initialize: function(params) {
	    this.trail = params.trail;
    },

    serialize: function() {
	    //send the list of images for this trail
	    var images = [];
	    var topics = this.trail.getTopics();
	    for(var i=0; i<topics.length; i++) {
		    var topic = topics.at(i);
		    var items = topic.getItemsForTrail(this.trail.attributes.slug);
		    for(var j=0; j<items.length; j++) {
			    var item = items.at(j);
				images.push(item.attributes.image);
		    }
	    }
	    return {
		    title: this.trail.attributes.title,
		    message: this.trail.attributes.finished_text,
		    images: images
	    }
    },

    events: {
        "click #nav-menu-button" : "toggleNavMenu",
    },

	  toggleNavMenu: function() {
		  var content = $('#content');
		  content.toggleClass('slideout');
	  }

  });

  return FinishedView;

});
