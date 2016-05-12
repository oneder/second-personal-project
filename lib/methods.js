Meteor.methods({
	'insertRoom': function (roomInfo) {
		return Rooms.insert(roomInfo);
	},
	'joinRoom': function (roomId, userId) {
		let selectedRoom = Rooms.findOne({_id: roomId});

		if(selectedRoom){
			let selectedPlayers = selectedRoom.players;

			// Check if user id is already in room
			for(var i = 0; i < selectedPlayers.length; i++){
				if(selectedPlayers[i] == userId)
					return false;
			}
			Rooms.update(roomId, {$push: {players: userId}});
			
			// Update room weight
			selectedRoom = Rooms.findOne({_id: roomId});
			let currentWeight = selectedRoom.players.length;
			Rooms.update(roomId, {$set: {weight: currentWeight}});

			selectedRoom = Rooms.findOne({_id: roomId});
			if(selectedRoom.weight >= selectedRoom.capacity)
				Rooms.update(roomId, {$set: {available: false}});
			
			return true;
		}

		return false;
	}
});