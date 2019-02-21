const https = require('https');
const fs = require('fs');

function download(url, dest, multi, name) {
  const file = fs.createWriteStream(dest);
  https.get(url, function(response) {
    response.pipe(file);

    const bar = createBar(
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

function createBar(size, multi, name) {
  return multi.newBar(`${name} [:bar] :percent :etas`, {
    width: 30,
    total: size
  });
}

module.exports = {
  download
};
