define(["backbone", "underscore", "app/collections/QuestionsCollection"], function(Backbone, _, QuestionsCollection) {

  var allQuestions = new QuestionsCollection();
  allQuestions.fetch();

  var ItemModel = Backbone.Model.extend({

    initialize: function() {
      //find all questions which pertain to this item with a topic in common
      this.questions = ItemModel.allQuestions.filter(function(question) {
        if(question.attributes.item === this.attributes.slug) {
          for(var i=0; i<this.attributes.trails.length; i++) {
            if(question.attributes.trails.indexOf(this.attributes.trails[i]) >= 0) {
              return true;
            }
          }
        }
        return false;
      }, this);
    },

    parse: function(response) {

      var item = {};
      item.slug = response.slug;
      item.title = response.title;
      item.topic = response.topic;
      item.image = response.image;
      item.video = response.video;
      item.hint = response.hint;
      item.beaconMajor = response.beaconMajor;
      item.beaconHint = response.beaconHint;

      item.trails = [];
      //read in the list of trails into a single array. The trails are parameters of id trail[n]
      var foundEmpty = false;
      var i=1;
      while(!foundEmpty) {
        var trailKey = "trail" + i;
        if(response[trailKey]) {
           item.trails.push(response[trailKey]);
        } else {
          foundEmpty = true;
        }
        i++;
      }
      return item;
    },
  },
  {
    //class parameters
    allQuestions: allQuestions
  }
  );
  return ItemModel;

});
