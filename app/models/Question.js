define(["backbone", "underscore"], function(Backbone, _) {

  var Question = Backbone.Model.extend({
    parse: function(response) {
      //collate the correct/incorrect response fields into an array of answer objects
      var q = { answers: []};
	    var answers = [];
      answers.push ( { text: response.correctAnswer,
                       response: response.correctResponse,
                       isCorrect: true,
                       id: 1
                     });
      answers.push ( { text: response.incorrectAnswer1,
                      response: response.incorrectResponse1,
                      isCorrect: false,
                      id: 2
                    });
      answers.push ( { text: response.incorrectAnswer2,
                      response: response.incorrectResponse2,
                      isCorrect: false,
                      id: 3
                    });
	    q.answers = _.shuffle(answers)
      q.slug = response.slug;
      q.item = response.item;
      q.question = response.question;
      q.selectedAnswer = null;
	    q.correctSound = response.correctSound;
	    q.incorrectSound = response.incorrectSound;

      //read in the list of trails into a single array. The trails are parameters of id trail[n]
      q.trails = [];
      var foundEmpty = false;
      var i=1;
      while(!foundEmpty) {
        var trailKey = "trail" + i;
        if(response[trailKey]) {
           q.trails.push(response[trailKey]);
        } else {
          foundEmpty = true;
        }
        i++;
      }

      return q;
    },
    selectAnswer: function(id) {
      q.selectedAnswer = id;
    },
    reset: function(id) {
      q.selectedAnswer = null;
    }
  });

  return Question;

});
