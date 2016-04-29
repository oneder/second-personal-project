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