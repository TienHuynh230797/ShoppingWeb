var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

/*var UserSchema = new Schema({
    username: {type: String, required: true, unique: true}, //email
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true}
});*/

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String
});

UserSchema.virtual('url').get(function () {
    return '/user/' + this._id;
});

/*UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};*/

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.pass, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.hash);
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);


