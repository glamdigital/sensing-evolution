define(["backbone", "jquery", "hbs!app/templates/resume"], function(Backbone, $, resumeTemplate) {

  var ResumeView = Backbone.View.extend({
    template: resumeTemplate,
    initialize: function(params) {
      this.timer = setTimeout(this.goHome, 30*1000);
    },
    goHome: function() {
      Backbone.history.navigate("home", { trigger: true });
    },
    clearTimer: function() {
      clearTimeout(this.timer);
    },
    events: {
        "click #resume-trail" : "clearTimer",
        "click #start-new-trail" : "clearTimer",
    },
  });

  return ResumeView;

});
