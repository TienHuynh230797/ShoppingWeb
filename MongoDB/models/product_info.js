var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductInfoModelSchema = new Schema({
    id: {type: Number, required: true, unique:true },
    product_id: {type: Number, required: true, unique:true},
    size: {type: Number, require: true, max: 50},
    Quantity: {type: Number, require: true, min: 0},
    Color: {type: String, require: true}});


var ProductInfo = mongoose.model('ProductInfo', ProductInfoModelSchema);
