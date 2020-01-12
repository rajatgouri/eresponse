var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PlaceRatingSchema = new Schema({
    userid: Schema.ObjectId,
    ratings:String,
    placeid:Schema.ObjectId
});
var placeRating = mongoose.model('placeRating',PlaceRatingSchema, 'placeRating');
module.exports = placeRating;