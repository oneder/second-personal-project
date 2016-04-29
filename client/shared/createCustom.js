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
			weight: 0,
			listeners: 0
		};

		Meteor.call('insertRoom', room);
		Router.go('create');
	}
})