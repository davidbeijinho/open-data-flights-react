const progress = require('progress-stream');
const { createGunzip } = require('zlib');
const { createReadStream, createWriteStream, statSync } = require('fs');
const bars = require('./bars.js');

const decompressFile = (inputfileName, outputFileName, multi, name) => {
  const bar = bars.createBar(100, multi, name);

  const stream = progress({
    length: statSync(inputfileName).size,
    time: 100 /* ms */
  });

  stream.on('progress', ({ percentage }) => {
    bar.tick(percentage);
  });

  const gzip = createGunzip();
  const input = createReadStream(inputfileName);
  const ouput = createWriteStream(outputFileName);

  input
    .pipe(stream)
    .pipe(gzip)
    .pipe(ouput);
};

module.exports = {
  decompressFile
};
