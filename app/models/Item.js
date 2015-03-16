define(["backbone", "underscore", "app/collections/QuestionsCollection"], function(Backbone, _, QuestionsCollection) {

  var allQuestions = new QuestionsCollection();

  var Item = Backbone.Model.extend({

    initialize: function() {
      //find all questions which pertain to this item with a topic in common
      var questionsArray = Item.allQuestions.filter(function(question) {
        if(question.attributes.item === this.attributes.slug) {
          for(var i=0; i<this.attributes.trails.length; i++) {
            if(question.attributes.trails.indexOf(this.attributes.trails[i]) >= 0) {
              return true;
            }
          }
        }
        return false;
      }, this);
        this.questions = new QuestionsCollection(_.shuffle(questionsArray));
        if(this.questions.length <= 0) { console.warn("Not enough quesions for item " + this.attributes.slug);}
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

    questionForTrail: function(trailId) {

        var qs = this.questions.filter(function(question) {
            return question.attributes.trails.indexOf(trailId) >= 0;
        });
        return qs[0];
    }
  },
  {
    //class parameters
    allQuestions: allQuestions,
      loadQuestions: function(callback) {
            allQuestions.fetch({success: callback });
      }
  }
  );
  return Item;

});
