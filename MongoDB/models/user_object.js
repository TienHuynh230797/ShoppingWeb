var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_objectSchema = new Schema({
    name: {type: String, required:true, min: 2, max: 100},
});

module.exports = mongoose.model('User_Object', user_objectSchema);
