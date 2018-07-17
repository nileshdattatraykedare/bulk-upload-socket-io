/*
Nilesh Kedare
*/
const csv = require("fast-csv");
const fs = require("fs");
const Promise = require('bluebird');

const request = require('request')
//const download = require('image-downloader')
  var downloadImage =require('./downloadImage');
var crypto = require("crypto");

const parseCsvDataAndGenerateArray = function(filepath) {
    try {
        return new Promise(function(resolve, reject) {
            var output = [];
            var i = 0;
            csv.fromPath(filepath).on("data", function(data) {
                if (i > 0) {

                    console.log(data[4] + '\r\n');


                    let filename = './downloads/image-' + crypto.randomBytes(20).toString('hex') + '';

                  downloadImage.downloadURI(data[4], filename, function(){

                  })

                    var newData = [];
                    newData[0] = data[1];
                    newData[1] = data[2];
                    newData[2] = data[3];
                    newData[3] = data[4];
                    newData[4] = data[5];
                    newData[5] = filename;
                    newData[6] = 2;
                    console.log(newData);
                    output.push(newData);


                }
                i++;
            }).on("end", function() {
                console.log('upload done');
                console.log(output);
                resolve(output);
            }).on("error", function(error) {
                reject(error);
            });
        });

    } catch (e) {
        console.error('exception: ' + e);
        reject(e);
    }
}

// downloadURI('https://image.shutterstock.com/image-vector/peace-sign-creative-lettering-hand-260nw-503667142.jpg','sample.jpg');

module.exports.parseCsvDataAndGenerateArray = parseCsvDataAndGenerateArray;
