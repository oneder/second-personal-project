Template.room.rendered = function init () {
	var s = new SoundBoard(document.getElementById('soundBoard'));
	var interval = 30;

	setInterval(function () {
		s.draw();
	}, interval);
}