const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

function processFile(inputName, allDdata) {
  const readStream = fs.createReadStream(inputName);

  readStream.pipe(JSONStream.parse('*')).pipe(
    es.mapSync((data) => {
      processData(data, allDdata);
    })
  );

  return new Promise((resolve, reject) => {
    readStream.on('end', () => {
      resolve(allDdata);
    })
    .on('error', (err) => {
      reject(err);
      console.log('ERROR reading file');
    });
  });
}

function processData(data, destination) {
  if (destination[data.ident]) {
    destination[data.ident] = data;
  }
}

module.exports = {
  processFile
};
