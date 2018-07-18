var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    var ext = 'jpg';
    if(res.headers['content-type'] === 'image/png'){
      ext = 'png';
    }
    if(res.headers['content-type'] === 'image/gif'){
      ext = 'gif';
    }
    request(uri).pipe(fs.createWriteStream(filename + '.' + ext)).on('close', callback);
  });
};
module.exports.downloadURI = download;
