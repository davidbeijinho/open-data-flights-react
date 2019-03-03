const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

function processFile(inputName, processer, baseData) {
  const readStream = fs.createReadStream(inputName);
  let data = baseData;
  readStream.pipe(JSONStream.parse('*')).pipe(
    es.mapSync((readData) => {
      data = processer(readData, data);
    })
  );

  return new Promise((resolve, reject) => {
    readStream.on('end', () => {
      resolve(data);
    })
    .on('error', (err) => {
      reject(err);
      console.log('ERROR reading file');
    });
  });
}

module.exports = {
  processFile
};
