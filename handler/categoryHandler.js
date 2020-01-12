var mongoose = require('mongoose');
var categorySchema = require('../schema/categorySchema.js');
var output;

exports.categoryList = function categoryList(myObj, callback){
    categorySchema.find({} ,function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = {response_code: 200, error: false , result:result};
        }
        return callback(null, output);
    });
}