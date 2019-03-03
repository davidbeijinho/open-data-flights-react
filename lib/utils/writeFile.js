const { createWriteStream } = require('fs');

const writeFile = (url, data) => {
  const writeStream = createWriteStream(url);

  writeStream
    .on('error', (e) => {
      console.log('ERROR WRITE STREAM', e);
    })
    .on('end', () => {
      console.log('END WRITE STREAM');
    });

  writeStream.write(JSON.stringify(data));
  writeStream.end();
};

const writeFileWithLog = (fileName, data, label) => {
  console.log(label);
  writeFile(fileName, data);
};

module.exports = {
  writeFile,
  writeFileWithLog
};
