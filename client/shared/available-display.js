Template.availableDisplay.events({
	'click #random-btn': function (e) {
		Router.go('room');
	},

	'click #custom-btn': function (e) {
		Router.go('createCustom');
	}
});