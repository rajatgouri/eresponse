var mongoose = require('mongoose');
var userSchema = require('../schema/userSchema.js');
var output;


exports.addUser = function addUser(myObj, callback){
    var _userSchema = new userSchema(myObj);
    _userSchema.save(function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = { message: "Record Added", response_code: 200, error: false };
        }
        return callback(null, output);  
    });
}

exports.updateUser = function updateUser(myObj, callback){
    userSchema.findOneAndUpdate({ _id: myObj.id }, myObj, {upsert:true}, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = { message: "Record Updated", response_code: 200, error: false,adddress:result };
        }
        return callback(null, output);  
    });
}

exports.deleteUser = function deleteUser(myObj, callback){
    userSchema.findByIdAndRemove({ _id: myObj.id }, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = { message: "Record Deleted", response_code: 200, error: false };
        }
        return callback(null, output);
    });
}

exports.UserList = function UserList(myObj, callback){
    userSchema.find({} ,function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = {response_code: 200, error: false , result:result};
        }
        return callback(null, output);
    });
}

exports.login = function login(myObj, callback){
    userSchema.find({userName:myObj.userName,password:myObj.password}, function(err,result){
        if(result.length <= 0){
            output = {responseCode : 400, error:true, errorMessage:"Invalid Username or password"};
        }
        else{
            output = {responseCode : 200, error:false,result:{"address":result[0].address,"id":result[0].id,"userName":result[0].userName,"fName":result[0].fName,"lName":result[0].lName,"phone":result[0].phone,"email":result[0].email}};
        }
        return callback(null, output)
    })
}