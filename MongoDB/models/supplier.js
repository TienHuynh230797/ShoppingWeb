var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var supplierSchema = new Schema({
    company_name:  {type: String, required: true},
    address: {type: String, max: 100},
    telephone: {type: String, max: 12},
    email: {type: String, max: 50},
});
module.exports  = mongoose.model('Supplier', supplierSchema );