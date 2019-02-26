const Multiprogress = require('multi-progress');
const fs = require('fs');
const decompressFile = require('./utils/decompressFile');
const config = require('./config/config.json');

const multi = new Multiprogress(process.stderr);

fs.readdirSync(config.decompressRoutes.sourceFolder).forEach(fileName => {
  const outputFilePath = fileName.replace(
    config.decompressRoutes.compressedExtension,
    config.decompressRoutes.decompressedExtension
  );
  decompressFile.decompressFile(
    config.decompressRoutes.sourceFolder + fileName,
    config.decompressRoutes.destinationFolder + outputFilePath,
    multi,
    fileName
  );
});
