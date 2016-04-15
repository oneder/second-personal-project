SoundBoard = function(canvas) {
	// Set Canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	this.canvas = canvas;
	this.ccontext = canvas.getContext('2d');
	this.width = canvas.width;
	this.height = canvas.height;
	this.ramount = 8;
	this.regions = [];
	this.mdown = false;
	this.refresh = true;

	// Set Audio
	this.nrefs = NoteRef(Notes);
	this.scontext = new AudioContext();
	this.tool = this.scontext.createOscillator();
	this.tool.type = "triangle";

	this.gain = this.scontext.createGain();
	this.gain.gain.value = 0;

	this.tool.connect(this.gain);
	this.gain.connect(this.scontext.destination);
	this.tool.start(0);

	// Set Regions
	var rheight = (this.height / this.ramount);
	for(var i = 0; i < this.ramount; i++){
		if(i != this.ramount - 1)
			this.regions[i] = new Region(0, i * rheight, this.width, rheight, this.nrefs[i][4]);
		else
			this.regions[i] = new Region(0, i * rheight, this.width, rheight, this.nrefs[0][5]);
	}

	var currentState = this;

	canvas.addEventListener("mousedown", function(e) {
		currentState.setRegionSound(e);
		currentState.gain.gain.value = 1;
		currentState.mdown = true;
	});
	canvas.addEventListener("mouseup", function(e) {
		currentState.gain.gain.value = 0;
		currentState.mdown = false;
	});
	canvas.addEventListener("mousemove", function(e) {
		if(currentState.mdown)
			currentState.setRegionSound(e);
	});
	canvas.addEventListener("mouseout", function(e) {
		if(currentState.mdown)
			currentState.gain.gain.value = 0;
	});
}

SoundBoard.prototype.draw = function () {
	if(this.refresh){
		this.clear();

		// Draw regions
		this.ccontext.strokeStyle = "#2b4c4c";
		this.ccontext.lineWidth = 2;
		for(var i = 0; i < this.regions.length; i++){
			var region = this.regions[i];
			this.ccontext.strokeRect(region.x, region.y, region.width, region.height);
			
		}

		this.refresh = false;
	}
}

SoundBoard.prototype.setRegionSound = function (e) {
	var mouse = this.getMouse(e);
	var mousex = mouse.x;
	var mousey = mouse.y;
	
	for(var i = 0; i < this.regions.length; i++){
		if(this.regions[i].contains(mousex, mousey)){
			this.tool.frequency.value = this.regions[i].note.value;
			
			console.log("Region " + i + ": " + this.regions[i].y + " " + (this.regions[i].y + this.regions[i].height) 
						+ "\n\tMouse: " + mousex + " " + mousey);
			break;
		}
	}
}

SoundBoard.prototype.getMouse = function (e) {
	var mousex, mousey;

	mousex = e.pageX;
	mousey = e.pageY;

	return {x: mousex, y: mousey};
}

SoundBoard.prototype.clear = function () {
	this.ccontext.clearRect(0, 0, this.width, this.height);
}