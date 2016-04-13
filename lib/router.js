Router.configure({layoutTemplate: 'layout'});

Router.route('/', {name: "home"});
Router.route('/listen', {name: "listen"});
Router.route('/create', {name: "create"});
Router.route('/room', {name: "room"});

Router.route('/room/:_id', {
	name: "roomID",
	waitOn: function () {
		return Meteor.subscribe('rooms');
	},
	data: function () {

	}
});
Router.route('/user/:username', {
	name: "userPage",
	waitOn: function () {
		return Meteor.subscribe('users');
	},
	data: function () {
		return Meteor.users.findOne();
	}
});