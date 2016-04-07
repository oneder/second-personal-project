Session.set('showUserForm', false);
Session.set('showSignIn', false);
Session.set('showCreateAccount', false);

Template.home.helpers({
	'userForm': function () {
		return Session.get('showUserForm');
	},

	'userSignIn': function () {
		return Session.get('showSignIn');
	},

	'createUser': function () {
		return Session.get('showCreateAccount');
	}
});

Template.home.events({
	"click #listen-btn": function (e) {
		if(Meteor.user())
			window.location.replace("/poopy");
		else
			window.location.replace("/room");
	},
	"click #create-btn": function (e) {
		if(Meteor.user())
			window.location.replace("/room");
		else
			console.log("SQG");
	}
});