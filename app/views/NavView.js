define(["backbone", "hbs!app/templates/nav_menu"], function(Backbone, navTemplate) {

    var NavView = Backbone.View.extend({

        template: navTemplate,

        initialize: function(params) {
            this.session = params.session;
            this.session.on('change', this.render, this)
        },

        serialize: function () {
            //compile a list of topics, each with a list of items
            var sessionData = this.session.getAllSessionTopicsAndItems();
            return sessionData;
        },
        hide: function() {
            //actually hide by sliding in the overlapping 'content' div
            $('#content').removeClass('slideout');
        }


    });

    return NavView;

});
