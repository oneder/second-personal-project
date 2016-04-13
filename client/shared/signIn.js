Template.signIn.events({
	'click #cancel-btn': function (e) {
		e.preventDefault();

		Session.set('showSignIn', false);
		Session.set('showUserForm', false);
		Session.set('showCreateAccount', false);
	},

	'click #signIn-btn': function (e, t) {
		e.preventDefault();

		let username = t.find('#username-text').value;
		let password = t.find('#password-text').value;

		Meteor.loginWithPassword(username, password, function (error) {
			if(error){
				// Login failed
			}
			else{
				Router.go('userPage', {username: username});
				Session.set('showSignIn', false);
				Session.set('showUserForm', false);
				Session.set('showCreateAccount', false);
			}
		});
	},

	'click #toggleCreateUser': function (e) {
		e.preventDefault();

		Session.set('showSignIn', false);
		Session.set('showCreateAccount', true);
	}
});