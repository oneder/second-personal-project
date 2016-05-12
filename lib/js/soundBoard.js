SoundBoard = function(canvas, roomId) {
	this.roomId = roomId;

	// Set Canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	this.canvas = canvas;
	this.ccontext = canvas.getContext('2d');
	this.width = canvas.width;
	this.height = canvas.height;
	this.ramount = 8;
	this.regions = [];
	this.panZone = new Region((this.width/2) - 50, 0, 50, this.height);
	this.mdown = false;
	this.refresh = true;

	// Set Audio
	this.nrefs = NoteRef(Notes);
	this.scontext = new AudioContext();
	this.tools = [
		{
			tool: this.scontext.createOscillator(),
			gain: this.scontext.createGain(),
			panner: this.scontext.createStereoPanner(),
			set: false
		},
		{
			tool: this.scontext.createOscillator(),
			gain: this.scontext.createGain(),
			panner: this.scontext.createStereoPanner(),
			set: false
		},
		{
			tool: this.scontext.createOscillator(),
			gain: this.scontext.createGain(),
			panner: this.scontext.createStereoPanner(),
			set: false
		},
		{
			tool: this.scontext.createOscillator(),
			gain: this.scontext.createGain(),
			panner: this.scontext.createStereoPanner(),
			set: false
		}
	];
	this.setTools();

	// Set Regions
	var rheight = Math.ceil(this.height / this.ramount);
	for(var i = 0; i < this.ramount; i++){
		if(i != this.ramount - 1)
			this.regions[i] = new Region(0, i * rheight, this.width, rheight, this.nrefs[i][4]);
		else
			this.regions[i] = new Region(0, i * rheight, this.width, rheight, this.nrefs[0][5]);
	}

	var currentState = this;
	// Mouse Events
	canvas.addEventListener("mousedown", function(e) {
		let newEvent = currentState.createSoundEvent(e, currentState, 1);
		Meteor.call('pushToQueue', currentState.roomId, newEvent);
		currentState.mdown = true;
	});
	canvas.addEventListener("mouseup", function(e) {
		let newEvent = currentState.createSoundEvent(e, currentState, 0);
		Meteor.call('pushToQueue', currentState.roomId, newEvent);
		currentState.mdown = false;
	});
	canvas.addEventListener("mousemove", function(e) {
		if(currentState.mdown){
			let newEvent = currentState.createSoundEvent(e, currentState, 1);
			Meteor.call('pushToQueue', currentState.roomId, newEvent);
		}
	});
	canvas.addEventListener("mouseout", function(e) {

	});

	// Touch Events
	canvas.addEventListener("touchstart", function(e) {

	});
	canvas.addEventListener("touchmove", function(e) {

	});
	canvas.addEventListener("touchend", function(e) {

	});
}

SoundBoard.prototype.setTools = function () {
	for(var i = 0; i < this.tools.length; i++){
		let currentTool = this.tools[i];

		currentTool.tool.type = "sine";
		currentTool.gain.gain.value = 0;
		currentTool.panner.pan.value = 0;

		currentTool.tool.connect(currentTool.panner);
		currentTool.panner.connect(currentTool.gain);
		currentTool.gain.connect(this.scontext.destination);

		currentTool.tool.start(0);
		currentTool.set = true;
	}
}

SoundBoard.prototype.createSoundEvent = function (e, currentState, gain) {
	let mouse = currentState.getMouse(e);
	let mousex = mouse.x;
	let mousey = mouse.y;

	let newEvent = new SoundEvent(
		Meteor.user()._id, 
		currentState.getRegionSound(mousex, mousey), 
		currentState.getPanAmount(mousex, mousey),
		gain
	);

	return newEvent;
}

SoundBoard.prototype.handle = function () {
	let currentState = this;
	Meteor.call('handleSoundEvent', this.roomId, function (error, result) {
		if(result){
			let index = result.index;
			let event = result.event;
			let tool = currentState.tools[index];

			if(tool.set == false){
				tool.tool.connect(tool.panner);
				tool.panner.connect(tool.gain);
				tool.gain.connect(this.scontext.destination);
				tool.tool.start(0);
				tool.set = true;
			}

			tool.tool.frequency.value = event.region;
			tool.gain.gain.value = event.gain;
			tool.panner.pan.value = event.panAmount;
		}
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

SoundBoard.prototype.getRegionSound = function (mousex, mousey) {
	for(var i = 0; i < this.regions.length; i++){
		if(this.regions[i].contains(mousex, mousey))
			return this.regions[i].note.value;
	}

	return -1;
}

SoundBoard.prototype.getPanAmount = function (mousex, mousey) {
	let panAmount = 0;
	let panOffset = 0;
	let panSide = 1;

	if(this.panZone.contains(mousex, mousey))
		panAmount = 0;
	else{
		if(mousex < this.panZone.x){
			panOffset = 1 - (mousex / this.panZone.x);
			panSide = -1;
		}
		else if(mousex > (this.panZone.x + this.panZone.width)){
			panOffset = (mousex / this.width);
			panSide = 1;
		}
		else
			panOffset = 0;

		panAmount = panSide * panOffset;
	}

	return panAmount;
}

SoundBoard.prototype.getMouse = function (e) {
	var mousex, mousey;
	var container = this.canvas.getBoundingClientRect();

	mousex = e.clientX - container.left;
	mousey = e.clientY - (container.top - 32);

	return {x: mousex, y: mousey};
}

SoundBoard.prototype.clear = function () {
	this.ccontext.clearRect(0, 0, this.width, this.height);
}