var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductInfoModelSchema = new Schema({
    image: {type: String},
    product: {type: Schema.ObjectId, ref: 'Product'},
    size: {type: String,
           enum: ['L', 'XL', 'M', 'S']},
    quantity: {type: Number, require: true, min: 0},
    color: {type: String, require: true}
});

ProductInfoModelSchema.virtual('url').get(function () {
    return '/productInfo/' +this._id;
});


module.exports = mongoose.model('ProductInfo', ProductInfoModelSchema);
