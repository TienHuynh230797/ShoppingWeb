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

UserSchema.plugin(passportLocalMongoose);

/*UserSchema.methods.validPassword = function(password) {
    if (password === String(this.local.password))
        return true;
    return false;
}*/


module.exports = mongoose.model('User', UserSchema);