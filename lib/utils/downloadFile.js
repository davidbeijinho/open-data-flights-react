const https = require('https');
const fs = require('fs');
const bars = require('./bars');

function download(url, dest, multi, name) {
  const file = fs.createWriteStream(dest);
  https.get(url, response => {
    const bar = bars.createBar(
      parseInt(response.headers['content-length']),
      multi,
      name
    );

    response
      .on('data', chunk => {
        bar.tick(chunk.length);
      })
      .pipe(file);
  });
}

module.exports = {
  download
};
