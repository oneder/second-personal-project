Meteor.startup(function () {
	AccountsGuest.enabled = true;
	AccountsGuest.anonymous = true;
	AccountsGuest.name = true;
});

Meteor.publish('users', function () {
	if(this.userId){
		return Meteor.users.find(this.userId);
	}
});

globals = function () {
	let set = {
		regions: 8
	}
	return set;
}