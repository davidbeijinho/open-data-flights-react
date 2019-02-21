const fs = require('fs');
const decompressFile = require('./utils/decompressFile');

const sourceFolder = './data/downloaded/';
const destinationFolder = './data/raw/';

fs.readdirSync(sourceFolder).forEach(file => {
  const outputFilePath = file.replace('.gz', '');
  decompressFile.decompressFile(sourceFolder + file, destinationFolder + outputFilePath);
});
