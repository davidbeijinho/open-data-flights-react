const { get } = require('https');
const { createWriteStream } = require('fs');
const { createBar } = require('./bars.js');

const downloadFile = (url, dest, multi, name) => {
  const file = createWriteStream(dest);
  get(url, (response) => {
    const bar = createBar(
      parseInt(response.headers['content-length'], 10),
      multi,
      name
    );

    response
      .on('data', (chunk) => {
        bar.tick(chunk.length);
      })
      .pipe(file);
  });
};

module.exports = {
  downloadFile
};
