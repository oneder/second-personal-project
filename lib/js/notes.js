function Note(name, value) {
	this.name = name;
	this.value = value;
}

Notes = {
	c: {
		c0: new Note('c0', 16.35),
		c1: new Note('c1', 32.70),
		c2: new Note('c2', 65.41),
		c3: new Note('c3', 130.82),
		c4: new Note('c4', 261.63),
		c5: new Note('c5', 523.25),
		c6: new Note('c6', 1046.50),
		c7: new Note('c7', 2093.00),
		c8: new Note('c8', 4186.01)
	},
	d: {
		d0: new Note('d0', 18.35),
		d1: new Note('d1', 36.71),
		d2: new Note('d2', 73.42),
		d3: new Note('d3', 146.83),
		d4: new Note('d4', 293.66),
		d5: new Note('d5', 587.33),
		d6: new Note('d6', 1174.66),
		d7: new Note('d7', 2349.32),
		d8: new Note('d8', 4698.63)
	},
	e: {
		e0: new Note('e0', 20.60),
		e1: new Note('e1', 41.20),
		e2: new Note('e2', 82.41),
		e3: new Note('e3', 164.81),
		e4: new Note('e4', 329.63),
		e5: new Note('e5', 659.25),
		e6: new Note('e6', 1318.51),
		e7: new Note('e7', 2637.02),
		e8: new Note('e8', 5274.04)
	},
	f: {
		f0: new Note('f0', 21.83),
		f1: new Note('f1', 43.65),
		f2: new Note('f2', 87.31),
		f3: new Note('f3', 174.61),
		f4: new Note('f4', 349.23),
		f5: new Note('f5', 698.46),
		f6: new Note('f6', 1396.91),
		f7: new Note('f7', 2793.83),
		f8: new Note('f8', 5587.65)
	},
	g: {
		g0: new Note('g0', 24.50),
		g1: new Note('g1', 49.00),
		g2: new Note('g2', 98.00),
		g3: new Note('g3', 196.00),
		g4: new Note('g4', 392.00),
		g5: new Note('g5', 783.99),
		g6: new Note('g6', 1567.98),
		g7: new Note('g7', 3135.96),
		g8: new Note('g8', 6271.93)
	},
	a: {
		a0: new Note('a0', 27.50),
		a1: new Note('a1', 55.00),
		a2: new Note('a2', 110.00),
		a3: new Note('a3', 220.00),
		a4: new Note('a4', 440.00),
		a5: new Note('a5', 880.00),
		a6: new Note('a6', 1760.00),
		a7: new Note('a7', 3520.00),
		a8: new Note('a8', 7040.00)
	},
	bb: {
		bb0: new Note('bb0', 29.14),
		bb1: new Note('bb1', 58.27),
		bb2: new Note('bb2', 116.54),
		bb3: new Note('bb3', 233.08),
		bb4: new Note('bb4', 466.16),
		bb5: new Note('bb5', 932.33),
		bb6: new Note('bb6', 1864.66),
		bb7: new Note('bb7', 3729.31),
		bb8: new Note('bb8', 7458.62)
	},
	b: {
		b0: new Note('b0', 30.87),
		b1: new Note('b1', 61.74),
		b2: new Note('b2', 123.47),
		b3: new Note('b3', 246.94),
		b4: new Note('b4', 493.88),
		b5: new Note('b5', 987.77),
		b6: new Note('b6', 1975.53),
		b7: new Note('b7', 3951.07),
		b8: new Note('b8', 7902.13)
	}
}