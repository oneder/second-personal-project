Meteor.startup(function () {
});

function setCurrentActiveMenu() {
    var pathname = window.location.pathname;
    $('.active').removeClass('active');
    $(".navbar-nav li a[href='" + pathname + "']").parent().addClass('active');
}