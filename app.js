// Require the libraries:
var SocketIOFileUpload = require('socketio-file-upload'),
    socketio = require('socket.io'),
    express = require('express');

const csv = require("fast-csv");
const fs = require("fs");
const Promise = require('bluebird');

const download = require('image-downloader')
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nilesh123',
    database: 'just_clean_app_test'
});

con.connect();

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


// Make your Express server:
var app = express()
    .use(SocketIOFileUpload.router)
    .use(express.static(__dirname + "/public"))
    .listen(8080);

// Start up Socket.IO:
var io = socketio.listen(app);
io.sockets.on("connection", function(socket) {
    var _socket = socket;

    console.log('Someone connected');


    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = "./uploads";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function(event) {
        console.log('task completed');
        _socket.emit('echo', 'upload completed');
        console.log('pathname: ' + event.file.pathName);
        const fileName = event.file.pathName;
        return parseCsvDataAndGenerateArray(event.file.pathName).then(function(rows) {
            console.log(rows);
            _socket.emit('echo', 'file parsed successfully');
                var query = con.query('INSERT INTO batches (batch_name, email, phone, actual_image_source, title, status) VALUES ?', [rows], (err, res) => {
                    if (err) throw err;

                    console.log(res);
                    _socket.emit('echo', 'saved to db successfully');
                });
                console.log(query.sql);

          //  });
        });
    });

    // Error handler:
    uploader.on("error", function(event) {
        console.log("Error from uploader", event);
    });
});
