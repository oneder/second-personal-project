Template.welcome.onCreated(function() {
	Meteor.subscribe('users');
});

Template.welcome.helpers({
	'userName': function () {
		return Meteor.users.findOne().username;
	}
});

Template.welcome.events({
	'click #toggleSignIn': function (e) {
		Session.set('showUserForm', true);
		Session.set('showSignIn', true);
	},

	'click #user-signout': function (e) {
		Meteor.logout();
	},

	'click #user-display': function (e) {
		let user = Meteor.users.findOne().username;
		Router.go('userPage', {username: user});
	}
});