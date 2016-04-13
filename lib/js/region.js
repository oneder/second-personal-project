function Region(x, y, width, height, note) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.note = note;
}

Region.prototype.contains = function(mousex, mousey) {
	return (this.x <= mousex) && ((this.x + this.width) >= mousex) &&
		   (this.y <= mousey) && ((this.y + this.height) >= mousey);
}