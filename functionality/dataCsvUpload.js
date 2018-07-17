/*
Nilesh Kedare
*/
const csv = require("fast-csv");
const fs = require("fs");
const Promise = require('bluebird');

const download = require('image-downloader')

const parseCsvDataAndGenerateArray = async function (filepath){
  try{
    return new Promise.resolve(function(){
      var output = [];
      csv.fromPath(filepath).on("data", async function(data){
      /*  console.log(data[4] + '\r\n');
        if(data[0] > 0){
          const options = { url: data[4],
    dest: './downloads/image-' + Date.now() + '.jpg'}
         downloadImage(options).catch(function(error){
           console.error(error);
         })
        output.push(data);
      }*/
        output.push(data);
       }).on("end", function(){
         console.log('upload done');
          Promise.resolve(output);
       }).on("error", function(error){
         Promise.reject(error);
       });
    });

  }
  catch(e){
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
