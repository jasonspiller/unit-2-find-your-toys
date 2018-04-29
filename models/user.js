// create schema
var mongoose 	= require('mongoose'),
		bcrypt 		= require('bcrypt');

var Schema = mongoose.Schema;


var UserSchema = new Schema({
	name: String,
	email: String,
	passwordDigest: String
 });

// create a new user with secure (hashed) password
UserSchema.statics.createSecure = function (name, email, password, callback) {

	// use the model
  var UserModel = this;

  // hash passwordp
  bcrypt.genSalt(function (err, salt) {

		// display the salt
		console.log('salt: ', salt);

    bcrypt.hash(password, salt, function (err, hash) {

    	// create the new user (save to db) with hashed password
      UserModel.create({
				name: name,
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

UserSchema.methods.checkPassword = function(password) {
	// return true if passwords match
	return bcrypt.compareSync(password, this.passwordDigest)
}

// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  // remember `this` refers to the User for methods defined on UserSchema.statics
  this.findOne({email: email}, function (err, foundUser) {
    console.log(foundUser);

    // throw error if can't find user
    if (!foundUser) {
      console.log('No user with email ' + email);
      callback("Error: no user found", null);  // better error structures are available, but a string is good enough for now
    // if we found a user, check if password is correct
    } else if (foundUser.checkPassword(password)) {
			console.log('Found User');
      callback(null, foundUser);
    } else {
      callback("Error: incorrect password", null);
    }
  });
};

var User = mongoose.model('User', UserSchema);


module.exports = User;
