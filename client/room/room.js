var canvas, ccontext, width, height, scontext, tool, gain, mdown, df;

Template.room.rendered = function init () {
	setCanvas();

	// Set Audio
	scontext = new AudioContext();
	tool = scontext.createOscillator();

	tool.type = "sine";
	tool.frequency.value = Notes.c.c5.value;
	df = 5;

	gain = scontext.createGain();
	gain.gain.value = 0;

	tool.connect(gain);
	gain.connect(scontext.destination);
	tool.start(0);
}

function setCanvas() {
	// Set Canvas
	canvas = document.getElementById('soundBoard');
	width = canvas.width;
	height = canvas.height;
	ccontext = canvas.getContext('2d');

	// Add listeners
	canvas.addEventListener("mousedown", play);
	canvas.addEventListener("mouseup", pause);
	//canvas.addEventListener("mousemove", changeFreq);
}

// Event handlers
function play (e) {
	gain.gain.value = 1;
	mdown = true;
}
function pause (e) {
	gain.gain.value = 0;
	mdown = false;
}
/*function changeFreq (e) {
	if(mdown){
		if(tool.frequency.value >= 880 || tool.frequency.value <= 220)
			df *= -1;

		tool.frequency.value += df;
	}
}*/