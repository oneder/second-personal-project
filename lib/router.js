Router.configure({layoutTemplate: 'layout'});

Router.route('/', {name: "home"});
Router.route('/listen', {name: "listen"});
Router.route('/create', {name: "create"});
Router.route('/room/:roomid', {
	name: "room",
	onStop: function () {
		let roomId = this.params.roomid;
		Meteor.call('removeFromRoom', Meteor.user()._id, roomId);
	}
});

Router.route('/create/custom', {name: "createCustom"});

Router.route('/user/:username', {
	name: "userPage",
	waitOn: function () {
		return Meteor.subscribe('users');
	}/*,
	data: function () {
		var currentRoom = this.params.roomid;

		return Rooms.findOne({_id: currentRoom});
	}*/
});