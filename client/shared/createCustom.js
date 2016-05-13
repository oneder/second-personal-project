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
			tools: [
				{
					gain: 0,
					frequency: 0,
					pan: 0
				},
				{
					gain: 0,
					frequency: 0,
					pan: 0
				},
				{
					gain: 0,
					frequency: 0,
					pan: 0
				},
				{
					gain: 0,
					frequency: 0,
					pan: 0
				}
			],
			notify: false,
			listeners: 0,
			queue: [],
			available: true
		};

		room.weight = room.players.length;

		Meteor.call('insertRoom', room, function (error, result) {
			if(!error)
				Router.go('/room/' + result);
		});
	}
})