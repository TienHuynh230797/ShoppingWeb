var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    id_number: {type: Number, required: true, unique:true},
    username: {type: String, required: true, unique: true, min: 1, max: 20},
    password: {type: String, required: true, min: 1, max: 30},
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    birthDay: {type: Date},
    address: {type: String, required: true, max: 100},
    telephone: {type: String, required: true, max: 12},
    email: {type: String, required: true, max: 50},
    position: {type: String, required: true},
});

module.exports = mongoose.model('Customer', CustomerSchema);
