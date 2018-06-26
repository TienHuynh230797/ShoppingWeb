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

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);