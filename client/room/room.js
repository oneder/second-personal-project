Template.canvas.onRendered(function () {
	InitializeCanvas();
});

function InitializeCanvas () {
	canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");

	canvas.addEventListener('mousedown', mouseUpFunction, false);
}

// MOUSE EVENTS
function mouseUpFunction (event) {
	var x = event.pageX;
	var y = event.pageY;

	context.fillStyle = "#000000";
	context.fillRect(x, y, 10, 10);
}
