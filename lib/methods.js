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
	'removeFromRoom': function (userId, roomId) {
		let prevRoom = Rooms.findOne({_id: roomId});

		if(prevRoom){
			let currentPlayers = prevRoom.players;
			let index = currentPlayers.indexOf(userId);
			currentPlayers = currentPlayers.splice(index, 1);
			let newWeight = currentPlayers.length;

			Rooms.update(roomId, {$set: {players: currentPlayers}});
			if(newWeight <= 0)
				Rooms.remove({_id: roomId});
			else
				Rooms.update(roomId, {$set: {weight: newWeight}});
		}
	},
	'pushToQueue': function (roomId, event) {
		let currentRoom = Rooms.findOne({_id: roomId});

		if(currentRoom)
			Rooms.update(roomId, {$push: {queue: event}});
	},
	'handleSoundEvent': function (roomId) {
		let currentRoom = Rooms.findOne({_id: roomId});

		if(currentRoom){
			if(currentRoom.queue.length > 0 && currentRoom.valid){
				Rooms.update(roomId, {$set: {valid: false}});

				let first = currentRoom.queue[0];
				Rooms.update(roomId, {$pop: {queue: -1}});

				currentRoom = Rooms.findOne({_id: roomId});
				let refIndex = currentRoom.players.indexOf(first.userId);

				let newTool = {
					gain: first.gain,
					frequency: first.region,
					pan: first.panAmount
				}
				Rooms.update(roomId, {$push: {tools: {$each: [newTool], $position: refIndex}}});
				currentRoom = Rooms.findOne({_id: roomId});
				let oldTools = currentRoom.tools;
				oldTools.splice(refIndex + 1, 1);
				Rooms.update(roomId, {$set: {tools: oldTools}});

				currentRoom = Rooms.findOne({_id: roomId});
				if(!currentRoom.notify)
					Rooms.update(roomId, {$set: {notify: true}});
			}
			else{
				if(currentRoom.notify){
					Rooms.update(roomId, {$set: {notify: false}});
					return true;
				}
			}

			currentRoom = Rooms.findOne({_id: roomId});
			return currentRoom.notify;
		}

		return null;
	},
	'getTools': function (roomId) {
		let currentRoom = Rooms.findOne({_id: roomId});

		if(currentRoom)
			return currentRoom.tools;

		return null;
	},
	'validateRoom': function (roomId) {
		let currentRoom = Rooms.findOne({_id: roomId});

		if(currentRoom)
			Rooms.update(roomId, {$set: {valid: true}});
	}
});