Router.route('/', function () {
	this.render('home');
});

Router.route('/room', {name: "room"});