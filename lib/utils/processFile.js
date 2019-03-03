const { createReadStream } = require('fs');
const { parse } = require('JSONStream');
const { mapSync } = require('event-stream');

const processFile = (inputName, processer, baseData) => {
  const readStream = createReadStream(inputName);
  let data = baseData;
  readStream.pipe(parse('*')).pipe(
    mapSync((readData) => {
      data = processer(readData, data);
    })
  );

  return new Promise((resolve, reject) => {
    readStream
      .on('end', () => {
        resolve(data);
      })
      .on('error', (err) => {
        reject(err);
        console.log('ERROR reading file');
      });
  });
};

module.exports = {
  processFile
};
