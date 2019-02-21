const https = require('https');
const fs = require('fs');
const bars = require('./bars');

function download(url, dest, multi, name) {
  const file = fs.createWriteStream(dest);
  https.get(url, function(response) {
    response.pipe(file);

    const bar = bars.createBar(
      parseInt(response.headers['content-length']),
      multi,
      name
    );

    response.on('data', function(chunk) {
      bar.tick(chunk.length);
    });

    file.on('finish', function() {
      file.close();
    });
  });
}

module.exports = {
  download
};
