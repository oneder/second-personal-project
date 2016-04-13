Meteor.publish('users', function () {
	if(this.userId){
		return Meteor.users.find(this.userId);
	}
});

Meteor.publish('rooms', function () {
	return Rooms.find();
});