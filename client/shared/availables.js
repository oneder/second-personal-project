Template.availables.onCreated(function() {
  Meteor.subscribe('rooms');
});

Template.availables.helpers({
	rooms: function () {
		return Rooms.find({});
	}
});