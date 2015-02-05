$(function() {

    var reset = function(ev) {

    };

    var revealHint = function(ev) {
        ev.preventDefault();
        //hide the link
        $target = $(ev.target);
        $target.hide();
        //unhide the hint
        $target.siblings(".hint").show();
    };

    var onItemFound = function(ev) {
        $(ev.target).hide();
        $(ev.target).siblings('.hint-container').hide();
        $(ev.target).siblings('.found-item').show();
        setTimeout(playVideo, 500);
    };

    var resetAll = function(ev) {
        location.reload();
    };

    var playVideo = function() {
        $('video').get(0).play();
    };

    //listen for events telling us we've been found
    $('.search-item').on('found', onItemFound);
    $('.restart-all').on('click', resetAll);

    //dev cheat button to simulate finding
    $('a.dev-control').on('click', function () {
        $('.search-item').trigger('found');
    });

    //show hint
    $('a.show-hint').on('click', revealHint);
});
