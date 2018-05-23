var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name:{type: String, required:true, min: 2, max: 100},
});

module.exports = mongoose.model('Category', CategorySchema);
