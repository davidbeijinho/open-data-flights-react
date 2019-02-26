const zlib = require('zlib');
const fs = require('fs');
const progress = require('progress-stream');
const bars = require('./bars');

function decompressFile(inputfileName, outputFileName, multi, name) {
  const bar = bars.createBar(100, multi, name);

  const stream = progress({
    length: fs.statSync(inputfileName).size,
    time: 100 /* ms */
  });

  stream.on('progress', progress => {
    bar.tick(progress.percentage);
  });

  const gzip = zlib.createGzip();
  const input = fs.createReadStream(inputfileName);
  const ouput = fs.createWriteStream(outputFileName);

  input
    .pipe(stream)
    .pipe(gzip)
    .pipe(ouput);
}

module.exports = {
  decompressFile
};
