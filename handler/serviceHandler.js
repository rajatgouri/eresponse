var mongoose = require('mongoose');
var serviceSchema = require('../schema/serviceSchema.js');
var output;

exports.serviceInfo = function serviceInfo(myObj, callback){
    serviceSchema.find({} ,function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = {response_code: 200, error: false , result:result};
        }
        return callback(null, output);
    });
}