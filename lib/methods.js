Meteor.methods({
	'insertRoom': function (roomInfo) {
		Rooms.insert(roomInfo);
	}
});