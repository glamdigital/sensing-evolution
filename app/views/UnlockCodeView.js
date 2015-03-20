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
                Backbone.trigger('unlock-item', null);
            }
            else if(code_value.length == 4){
                //Full, incorrect code entered
                //inform the user and clear the box
                console.log("Incorrect code entered!");
                $code.empty();
            } else {
                //nothing to do

            }
        }

    })

    return UnlockCodeTemplate;
});
