Rooms = new Mongo.Collection('rooms');

if(Meteor.isServer){
	Meteor.publish('rooms', function () {
		return Rooms.find({});
	});
}