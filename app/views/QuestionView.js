define(["backbone", "hbs!app/templates/question"],
    function(Backbone, questionTemplate) {

      var QuestionView = Backbone.View.extend({

        template: questionTemplate,

        initialize: function(params) {
          this.question = params.question;
          this.nextURL = params.nextURL;
        },

        serialize: function() {
          var output = this.question.toJSON();
          //shuffle the answers for rendering
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
          $target.parents('li').siblings('li').hide();
          $target.siblings('.response').show();

          //either show proceed, or retry
          if($target.parent().hasClass('correct')) {
            $('.proceed').show();
          } else {
            $('.try-again').show();
          }
        },

        reset: function(ev) {
          //re-render view
          ev.preventDefault();
          this.render();
        }

      });

      return QuestionView;

    });
