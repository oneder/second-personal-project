Template.availables.onCreated(function() {
  Meteor.subscribe('rooms');
});

Template.availables.helpers({
	'rooms': function () {
		return Rooms.find({'available': true});
	}
});

Template.availables.events({
	'click .list-group-item': function (e) {
		e.preventDefault();

		let selectedId = $(this)[0]._id;
		let selectedRoom = Rooms.findOne({_id: selectedId});

		if(selectedRoom.weight < selectedRoom.capacity){
			Meteor.call('joinRoom', selectedId, Meteor.user()._id, function (error, result){
				if(result)
					Router.go('room', {roomid: selectedId});
			});
		}
	}
});