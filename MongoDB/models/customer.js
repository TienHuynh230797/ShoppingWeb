var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    id_number: {type: Number, required: true, unique:true},
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    birthDay: {type: Date,
                validate: {
                    validate: function(value) {
                        return /\d{2}-\d{2}-\d{4}/.test(value);
                        },
                    message: '{VALUE} is not a valid birthday '
        }},
    address: {type: String, required: true, max: 100},
    telephone: {type: String, required: true, max: 12},
    email: {type: String, required: true, max: 50},
});

var Customer = mongoose.model('Customer', CustomerSchema);
