Template.navbar.onCreated(function() {
	Meteor.subscribe('users');
});

Template.navbar.helpers({
	'profileLink': function () {
		let user = Meteor.users.findOne().username;
		return "/user/" + user;
	},
	'isGuest': function () {
		return Meteor.user() ? Meteor.user().profile.guest : null;
	}
});

Template.navbar.events({
	"click #listen-btn": function (e) {
		Router.go('listen');
	},
	"click #create-btn": function (e) {
		Router.go('create');
	},
	'click #user-signout': function (e) {
		Meteor.logout(function (error) {
			if(error){
				// Failed to logout
			}
			else
				Router.go('home');
		});
	}
});