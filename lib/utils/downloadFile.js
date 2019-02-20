const https = require('https');
const fs = require('fs');

function download(url, dest) {
  const file = fs.createWriteStream(dest);
  https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close();
    });
  });
}

module.exports = {
    download,
};
