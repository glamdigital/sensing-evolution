define(["backbone"], function(Backbone) {

  var Question = Backbone.Model.extend({
    parse: function(response) {
      //collate the correct/incorrect response fields into an array of answer objects
      var q = { answers: []};
      q.answers.push ( { text: response.correctAnswer,
                       response: response.correctResponse,
                       isCorrect: true,
                       id: 1
                     });
      q.answers.push ( { text: response.incorrectAnswer1,
                      response: response.incorrectResponse1,
                      isCorrect: false,
                      id: 2
                    });
      q.answers.push ( { text: response.incorrectAnswer2,
                      response: response.incorrectResponse2,
                      isCorrect: false,
                      id: 3
                    });
      q.slug = response.slug;
      q.item = response.item;
      q.trail = response.trail;
      q.question = response.question;
      q.selectedAnswer = null;
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
