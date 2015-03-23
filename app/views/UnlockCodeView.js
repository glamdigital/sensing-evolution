define(['backbone', 'hbs!app/templates/unlock_code'],
    function(Backbone, unlockCodeTemplate) {

    var UnlockCodeTemplate = Backbone.View.extend({

        template: unlockCodeTemplate,

        initialize: function (params) {
            this.item_code = params.item.attributes.unlock_code;
        },

        serialize: function (params) {

        },

        events: {
            "click .unlock-code-button" : "onClickedButton"
        },

        onClickedButton: function(ev) {
            if (this.input_disabled) {
                return;
            }

            // get which button was pressed
            var $button = $(ev.target);
            var num = $button.attr('number')

            //get the current string
            var $code = $('.item-unlock-code');
            var code_value = $code.html();

            var code_value = code_value.toString() + num.toString();
            $code.html(code_value);

            if (code_value == this.item_code) {
                //unlock the item
                console.log("Code cracked!");
                $code.addClass('correct');
                setTimeout(this.goToFoundPage, 1000);

                //TODO SFX/animation
            }
            else if(code_value.length == this.item_code.length){
                //Full, incorrect code entered
                //inform the user and clear the box
                console.log("Incorrect code entered!");

                //turn it red, then reset later
                this.input_disabled = true;
                $code.addClass('incorrect');

                setTimeout(this.reset.bind(this), 1000);

                //TODO SFX/animation

            } else {
                //nothing to do

            }
        },

        reset: function() {
            var $code = $('.item-unlock-code');
            $code.empty();
            $code.removeClass('incorrect');
            this.input_disabled = false;
        },

        goToFoundPage: function() {
            Backbone.trigger('unlock-item', null);
        }

    })

    return UnlockCodeTemplate;
});
