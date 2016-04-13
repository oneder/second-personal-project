var canvas, ccontext, scontext, tool, gain, mdown, df;

Template.room.rendered = function init () {
	// Set Canvas
	canvas = document.getElementById('soundBoard');
	ccontext = canvas.getContext('2d');

	canvas.addEventListener("mousedown", play);
	canvas.addEventListener("mouseup", pause);
	canvas.addEventListener("mousemove", changeFreq);

	// Set Audio
	scontext = new AudioContext();
	tool = scontext.createOscillator();

	tool.type = "sine";
	tool.frequency.value = 440;
	df = 5;

	gain = scontext.createGain();
	gain.gain.value = 0;

	tool.connect(gain);
	gain.connect(scontext.destination);
	tool.start(0);
}

function play (e) {
	gain.gain.value = 1;
	down = true;
}

function pause (e) {
	gain.gain.value = 0;
	down = false;
}

function changeFreq (e) {
	if(down){
		if(tool.frequency.value >= 880 || tool.frequency.value <= 220)
			df *= -1;

		tool.frequency.value += df;
	}
}