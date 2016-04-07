Template.welcome.helpers({
	'userName': function () {
		return Meteor.user().username;
	}
});

Template.welcome.events({
	'click #toggleSignIn': function (e) {
		Session.set('showUserForm', true);
		Session.set('showSignIn', true);
	},

	'click #user-signout': function (e) {
		Meteor.logout();
	}
});