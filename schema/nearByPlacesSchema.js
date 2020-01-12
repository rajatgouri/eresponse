var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var nearByPlacesSchema = new Schema({
        loc : Array,
        city : String,
        placeName : String,
        placeid : Schema.ObjectId
});
var nearByPlaces = mongoose.model('nearByPlace',nearByPlacesSchema, 'nearByPlace');
module.exports = nearByPlaces;