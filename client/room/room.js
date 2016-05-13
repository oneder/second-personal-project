Template.room.rendered = function init () {
	let path = window.location.pathname;
	let components = path.split('/');
	let roomId = components[components.length-1];

	var s = new SoundBoard(document.getElementById('soundBoard'), roomId);
	var interval = 30;

	setInterval(function () {
		if((s.scontext.currentTime * 1000) % 150 == 0)
			Meteor.call('flagTools', s.scontext.roomId);
		
		s.handle();
		s.draw();
	}, interval);
}