var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    serviceInfo: {type:Array,required:true,unique:true,dropDrups:false},
    placeid:Schema.ObjectId
});

var service = mongoose.model('service',serviceSchema, 'service');
module.exports = service;