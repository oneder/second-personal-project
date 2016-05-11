Template.createCustom.rendered = function () {
	$('.question').popover();
};

Template.createCustom.events({
	'click #createBtn': function (e, temp) {
		e.preventDefault();

		let name = temp.find('#inputName').value;
		let cap = temp.find('#inputCapacity').value;

		let room = {
			name: name,
			capacity: cap,
			players: [Meteor.user()._id],
			weight: 0,
			listeners: 0
		};

		room.weight = room.players.length;

		Meteor.call('insertRoom', room, function (error, result) {
			if(!error)
				Router.go('/room/' + result);
		});
	}
})