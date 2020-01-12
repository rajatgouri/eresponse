var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    categoryName: {type:String,required:true,unique:true,dropDrups:false},
    placeid:Schema.ObjectId
});

var category = mongoose.model('category',categorySchema, 'category');
module.exports = category;