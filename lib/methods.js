Meteor.methods({
	'insertRoom': function (roomInfo) {
		return Rooms.insert(roomInfo);
	}
});