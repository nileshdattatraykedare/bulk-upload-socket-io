/*
Nilesh Kedare
*/
const csv = require("fast-csv");
const fs = require("fs");
const Promise = require('bluebird');

const download = require('image-downloader')

const parseCsvDataAndGenerateArray = function(filepath) {
    try {
        return new Promise(function(resolve, reject) {
            var output = [];
            csv.fromPath(filepath).on("data", function(data) {
              if(data[0] > 0){
              var newData = [];
                /*  console.log(data[4] + '\r\n');
            if(data[0] > 0){
              const options = { url: data[4],
        dest: './downloads/image-' + Date.now() + '.jpg'}
             downloadImage(options).catch(function(error){
               console.error(error);
             })
            output.push(data);
          }*/
          newData.push(data[1])
          newData.push(data[2]);
          newData.push(data[3])
          newData.push(data[4]);
          newData.push(data[5]);
          newData.push(2);

                output.push(newData);
              }
            }).on("end", function() {
                console.log('upload done');
                //console.log(output);
                resolve(output);
            }).on("error", function(error) {
                reject(error);
            });
        });

    } catch (e) {
        console.error('exception: ' + e);
    }
}

var downloadImage = async function(options){
  try {
     var { filename, image } = await download.image(options)
     console.log(filename) // => /path/to/dest/image.jpg
   } catch (e) {
     console.error(e)
   }
};

module.exports.parseCsvDataAndGenerateArray = parseCsvDataAndGenerateArray;
