const zlib = require('zlib');
const fs = require('fs');

function decompressFile(filename, output) {
    const input = fs.createReadStream(filename);
    const file = fs.createWriteStream(output);
    const data = [];
  
    input
      .on('data', function(chunk) {
        // console.log(chunk.length)
        data.push(chunk);
      })
      .on('end', function() {
        const buf = Buffer.concat(data);
        zlib.gunzip(buf, function(err, buffer) {
          if (!err) {
            file.write(buffer);
          } else {
            console.log(err);
          }
        });
      })
      .on('error', err => {
        console.log('error reading file', err);
      });
  
    file
      .on('error', err => {
        console.log('error reading file', err);
      })
      // .on('finish', function() {
      //   file.close();
      //   console.log('UNZIPED');
      // });
  }

  module.exports = {
      decompressFile,
  }