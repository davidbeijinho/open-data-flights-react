const { createWriteStream } = require('fs');
const { logger } = require('./logger.js');

const writeFile = (url, data) => {
  const writeStream = createWriteStream(url);

  writeStream
    .on('error', (err) => {
      logger.log('error', 'ERROR: writing sream', err);
    })
    .on('end', () => {
      logger.log('info', 'End writing stream');
    });

  writeStream.write(JSON.stringify(data));
  writeStream.end();
};

const writeFileWithLog = (fileName, data, label) => {
  logger.log('info', label);
  writeFile(fileName, data);
};

module.exports = {
  writeFile,
  writeFileWithLog
};
