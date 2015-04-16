define(["backbone", "underscore", "hbs!app/templates/question"],
    function(Backbone, _, questionTemplate) {

      var QuestionView = Backbone.View.extend({

        template: questionTemplate,

        initialize: function(params) {
          this.question = params.question;
          //this.nextURL = params.nextURL;
          this.session = params.session;
          this.shuffledAnswers = _.shuffle(this.question.attributes.answers);

	        //init audio
            if(typeof(Media) !== 'undefined') {

	            var pathPrefix = ''
                if(device.platform.toLowerCase() === "android") {
                    pathPrefix = "/android_asset/www/";
                }
                this.correctAudio = new Media(pathPrefix + this.question.attributes.correctSound);
	            this.incorrectAudio = new Media(pathPrefix + this.question.attributes.incorrectSound)
                } else { console.log("Media plugin not available!");}
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
          "click .try-again": "reset",
          "click .proceed": "proceed"
        },

        onSelectAnswer: function(ev) {
          //hide other answers. Reveal response
          ev.preventDefault();
          var $target = $(ev.target);
          var $button = $target.hasClass('button') ? $target : $target.parents('.button');
          $button.addClass('chosen');
          $button.parents('.answer-container').siblings('.answer-container').hide();
          $button.siblings('.response').show();

          //either show proceed, or retry
          if($target.parents('.answer').hasClass('correct')) {
            $('.proceed').show();
              //fire an event to say this item is complete
              Backbone.trigger('complete-item', {slug: this.question.attributes.item});

	          //Play the correct sound
				this.correctAudio.play();

          } else {
            $('.try-again').show();

	          //Play the incorrect sound
	          this.incorrectAudio.play();
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
        },

        proceed: function(ev) {
            ev.preventDefault();
            //get next url and navigate to
            var nextURL = this.session.getNextURL();
            Backbone.history.navigate(nextURL);
        }

      });

      return QuestionView;

    });
