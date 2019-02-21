const zlib = require('zlib');
const fs = require('fs');
const writeFile = require('./writeFile');

function decompressFile(filename, output) {
    const input = fs.createReadStream(filename);
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
            writeFile.writeFile(output, buffer);
          } else {
            console.log(err);
          }
        });
      })
      .on('error', err => {
        console.log('Error reading file', err);
      });
  }

  module.exports = {
      decompressFile,
  }