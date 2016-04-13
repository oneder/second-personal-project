Template.userPage.onCreated(function() {
	Meteor.subscribe('users');
});

Template.userPage.helpers({
	'userName': function () {
		return Meteor.users.findOne().username;
	},
	'profilePicture': function () {
		return Meteor.users.findOne().profile.image;
	},
	'vibes': function () {
		return Meteor.users.findOne().profile.vibes;
	}
})