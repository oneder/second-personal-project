Template.createAccount.events({
	'click #backToSignIn': function (e) {
		e.preventDefault();

		Session.set('showCreateAccount', false);
		Session.set('showSignIn', true);
	},

	'click #createAccount-btn': function (e, t) {
		e.preventDefault();

		let email = t.find('#new-email').value;
		let username = t.find('#new-username').value;
		let password = t.find('#new-password').value;
		let confirm = t.find('#confirm-password').value;

		let trimInput = function (val) {
			return val.replace(/^\s*|\s*$/g, "");
		};
		email = trimInput(email);

		let isValid = function (password, confirm) {
			if(password == confirm) {
				if(password.length >= 8)
					return true; 
				else {
					// password not long enough
					return false;
				}
			}
			else{
				// Passwords don't match
			}
		};

		if(isValid(password, confirm)) {
			Accounts.createUser({
				email: email,
				username: username,
				password: password,
				profile: {
					sounds: ['cow', 'drum', 'ham'],
					vibes: 50
				}
			});

			
		}
	}
});