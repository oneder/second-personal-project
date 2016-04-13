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
		Router.go('listen');
	},
	"click #create-btn": function (e) {
		Router.go('create');
	}
});