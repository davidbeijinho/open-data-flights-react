const fs = require('fs');
const decompressFile = require('./utils/decompressFile');
const config = require('./config/config.json');

fs.readdirSync(config.decompressData.sourceFolder).forEach(file => {
  const outputFilePath = file.replace(config.decompressData.compressedExtension, config.decompressData.decompressedExtension);
  decompressFile.decompressFile(config.decompressData.sourceFolder + file, config.decompressData.destinationFolder + outputFilePath);
});
