define(["backbone", "underscore", "hbs!app/templates/question"],
    function(Backbone, _, questionTemplate) {

      var QuestionView = Backbone.View.extend({

        template: questionTemplate,

        initialize: function(params) {
          this.question = params.question;
          this.nextURL = params.nextURL;
          this.shuffledAnswers = _.shuffle(this.question.attributes.answers);
        },

        serialize: function() {
          var output = this.question.toJSON();
          //insert the shuffled copy of the answers
          output.shuffledAnswers = this.shuffledAnswers;
          output.nextURL = this.nextURL;
          return output;
        },

        events: {
          "click .answer": "onSelectAnswer",
          "click .try-again": "reset"
        },

        onSelectAnswer: function(ev) {
          //hide other answers. Reveal response
          ev.preventDefault();
          var $target = $(ev.target);
            $target.parents('.button').addClass('chosen');
          $target.parents('.answer-container').siblings('.answer-container').hide();
          $target.parents('.button').siblings('.response').show();

          //either show proceed, or retry
          if($target.parents('.answer').hasClass('correct')) {
            $('.proceed').show();
          } else {
            $('.try-again').show();
          }
        },

        reset: function(ev) {
          //re-render view
          ev.preventDefault();
          //this.render();
            $('.try-again').hide();
            $('.response').hide();
            var $answers = $('.answer-container');
            $answers.find('.button').removeClass('chosen');
            $answers.show();
        }

      });

      return QuestionView;

    });
