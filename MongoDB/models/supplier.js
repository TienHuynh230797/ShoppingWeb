var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var supplierSchema = new Schema({
    company_id: {type: Number, required: true},
    company_name:  {type: Text, required: true},
    address: {type: Text, max: 100},
    telephone: {type: Text, max: 15},
    email: {type: Text, max: 100},
});
var supplier = mongoose.model('SomeModel', supplierSchema );