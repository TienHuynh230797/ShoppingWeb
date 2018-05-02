var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    id_number: Schema.Types.ObjectId,

    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    birthDay: {type: Date},
    address: {type: String, required: true, max: 100},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
});

var Customer = mongoose.model('Customer', CustomerSchema);
