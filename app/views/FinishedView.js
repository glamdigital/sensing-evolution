define(["backbone", "hbs!app/templates/finished"], function(Backbone, finishedTemplate) {

  var FinishedView = Backbone.View.extend({

    template: finishedTemplate,

      initialize: function(params) {
        this.trail = params.trail;
          this.shareURL = "http://www.prm.ox.ac.uk";
      },

      serialize: function() {
          var out = {};
          out.trail = this.trail.toJSON();
          return out;
      },
      events: {
          "click #share-facebook": "onClickFacebook",
          "click #share-twitter": "onClickTwitter"
      },
      onClickFacebook: function(event) {
          var is_iOS = navigator.userAgent.match(/(iPhone|iPod|iPad)/);
          // iOS 7+ has a nice system message if an account isn't configured, so always attempt the share
          var alertNotAvailable = is_iOS? null : function () { navigator.notification.alert("Please check that you have the Twitter app installed", null, "Not available", "OK"); };

          window.plugins.socialsharing.shareViaFacebook(this.buildShareMessage(), this.trail.attributes.shareURL, null, null, alertNotAvailable);
      },
      onClickTwitter: function(event) {
          var is_iOS = navigator.userAgent.match(/(iPhone|iPod|iPad)/);
          // iOS 7+ has a nice system message if an account isn't configured, so always attempt the share
          var alertNotAvailable = is_iOS? null : function () { navigator.notification.alert("Please check that you have the Twitter app installed", null, "Not available", "OK"); };

          window.plugins.socialsharing.shareViaTwitter(this.buildShareMessage(), this.trail.attributes.shareURL, null, null, alertNotAvailable);
      },
      buildShareMessage: function() {
          return "I just completed the " + this.trail.attributes.title + " at the Pitt Rivers Museum";
      }
  });

  return FinishedView;

});
