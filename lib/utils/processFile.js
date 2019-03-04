const { createReadStream } = require('fs');
const { parse } = require('JSONStream');
const { mapSync } = require('event-stream');
const { logger } = require('./logger.js');

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
        logger.log('error', 'ERROR: reading file', err);
      });
  });
};

module.exports = {
  processFile
};
