var mongoose = require('mongoose');
var imageSchema = require('../schema/imagesSchema.js');
var output;
var multiparty = require('multiparty');
var fs = require('fs');

exports.uploadImages = function uploadImages(req, callback) {
    var form = new multiparty.Form();
    var tempFileName;
    var fileArray = [];
    form.parse(req, function (err, fields, files) {
        // CODE TO UPDATE IMAGES :START
        console.log(fields);
        console.log(files);
        if (fields.isUpdate[0]!="false") {
            fileArray = fields.previousimages;
            for (let k = 0; k < files.file.length; k++) {
                var file = files.file[k];
                tempFileName = Date.now() + Math.random().toString(36).substring(10) + '_' + file.originalFilename;
                var folderName = "./data/";
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                }
                readAndWriteFile(file, folderName + tempFileName);
                fileArray.push(tempFileName);
            }
            var newBodyObject = {
                images: fileArray,
                placeid: fields.placeid[0]
            }

            imageSchema.findOneAndUpdate({ placeid: fields.placeid[0] }, newBodyObject, { upsert: true }, function (err, result) {
                if (err) {
                    output = { response_code: err.code, error: true, message: err.message };
                }
                else {
                    output = { message: "Record Updated", response_code: 200, error: false, result: result };
                }
                return callback(null, output);
            });
        }
        // CODE TO UPDATE IMAGES :END
        // CODE TO UPLOAD NEW IMAGES :START
        else {
            fileArray = [];
            for (let k = 0; k < files.file.length; k++) {
                var file = files.file[k];
                tempFileName = Date.now() + Math.random().toString(36).substring(10) + '_' + file.originalFilename;
                var folderName = "./data/";
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                }
                readAndWriteFile(file, folderName + tempFileName);
                fileArray.push(tempFileName);
            }
            var newBodyObject = {
                images: fileArray,
                placeid: fields.placeid[0]
            }
            var _imageSchema = new imageSchema(newBodyObject);
            _imageSchema.save({ upsert: true }, function (err, result) {
                if (err) {
                    output = { response_code: err.code, error: true, message: err.message };
                }
                else {
                    output = { message: "Record Added", response_code: 200, error: false, result: result };
                }
                return callback(null, output);
            });
        }
        // CODE TO UPLOAD NEW IMAGES :END
    });
}


// CODE TO DELETE IMAGES :START
exports.deleteImages = function deleteImages(req, callback) {
    var form = new multiparty.Form();
    var deleteimageId;
    form.parse(req, function (err, fields) {
        var newBodyObject = {
            images: fields.imageId,
            placeid: fields.placeid[0]
        }
        deleteimageId = fields.deleteImage[0];
        imageSchema.findOneAndUpdate({ placeid: newBodyObject.placeid }, newBodyObject, { $pull: { images: newBodyObject.images } }, function (err, result) {
            if (err) {
                output = { response_code: err.code, error: true, message: err.message };
            }
            else {
                output = { message: "Record Updated", response_code: 200, error: false, result: result };
                var folderName = "./data/"+deleteimageId;
                fs.unlink(folderName, (err) => {
                     console.log('successfully deleted '+folderName); 
                    });
            }
            return callback(null, output);
        });
    });
}
// CODE TO DELETE IMAGES :END


function readAndWriteFile(singleImg, newPath) {
    fs.readFile(singleImg.path, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            fs.writeFile(newPath, data, function (err) {
                if (err) {
                    console.log('ERRRRRR!! :' + err);
                }
                console.log('uploadPath: ' + newPath);
            })
        }
    })
}