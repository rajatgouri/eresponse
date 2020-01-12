var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var registerPlaceSchema = new Schema({
    address: String,
    loc : Array,
    name:String,
    category:String,
    services:Array,
    timings:String,
    phoneNumber:String,
    userid:Schema.ObjectId
});
var registerPlace = mongoose.model('registerPlace',registerPlaceSchema, 'registerPlace');
module.exports = registerPlace;