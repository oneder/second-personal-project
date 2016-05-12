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
	},
	'pushToQueue': function (roomId, event) {
		let currentRoom = Rooms.findOne({_id: roomId});

		if(currentRoom)
			Rooms.update(roomId, {$push: {queue: event}});
	},
	'handleSoundEvent': function (roomId) {
		let currentRoom = Rooms.findOne({_id: roomId});

		if(currentRoom){
			if(currentRoom.queue.length > 0){
				let first = currentRoom.queue[0];
				Rooms.update(roomId, {$pop: {queue: -1}});

				currentRoom = Rooms.findOne({_id: roomId});
				let refIndex = currentRoom.players.indexOf(first.userId);

				return {index: refIndex, event: first};
			}
		}

		return null;
	}
});