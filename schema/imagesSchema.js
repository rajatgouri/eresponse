var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    images:Array,
    placeid:Schema.ObjectId
});

var images = mongoose.model('images',imageSchema, 'images');
module.exports = images;