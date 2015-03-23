define(["backbone", "hbs!app/templates/finished"], function(Backbone, finishedTemplate) {

  var FinishedView = Backbone.View.extend({

    template: finishedTemplate,

      initialize: function(params) {
        this.trail = params.trail;
        this.shareURL = "http://www.prm.ox.ac.uk";
        this.instagramInstalled = false;
          var ig = typeof(Instagram);
          if(typeof(Instagram) !== "undefined") {
              Instagram.isInstalled(function (err, installed) {
                  if (installed) {
                      console.log("Instagram is", installed); // installed app version on Android
                      alert("Instagram is installed");
                      this.instagramInstalled = true;
                  } else {
                      console.log("Instagram is not installed");
                      alert("Instagram is not installed");
                  }
              }.bind(this));
          }
      },

      serialize: function() {
          var out = {};
          out.trail = this.trail.toJSON();
          return out;
      },
      events: {
          "click #share-facebook": "onClickFacebook",
          "click #share-twitter": "onClickTwitter",
          "click #share-instagram": "onClickInstagram"
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
      onClickInstagram: function(event) {
          if(this.instagramIsInstalled) {
              alert("Pressed Instagram button, with instagram installed");
              Instagram.share("http://www.prm.ox.ac.uk/images/sliderimages/Interior2013.jpg", "Testing instagram", function (err) {
                  if (err) {
                      console.log("not shared");
                      alert("Not shared");
                  } else {
                      console.log("shared");
                  }
              });
          }
          else {
              console.log("Unable to share as Instagram is not installed");
          }
      },
      buildShareMessage: function() {
          return "I just completed the " + this.trail.attributes.title + " at the Pitt Rivers Museum";
      }

  });

  return FinishedView;

});
