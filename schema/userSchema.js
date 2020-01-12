var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {type:String,required:true,unique:true,dropDrups:false},
    fName:String,
    lName:String,
    phone:Number,
    email:String,
    password:{type:String,required:true},
    address:String
});
var users = mongoose.model('users',userSchema, 'users');
module.exports = users;