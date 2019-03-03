const Multiprogress = require('multi-progress');
const { readdirSync } = require('fs');
const { decompressFile } = require('./utils/decompressFile');
const { generateFileName } = require('./utils/generateFileName');
const {
  compressedExtension,
  decompressedExtension,
  sourceFolder,
  destinationFolder
} = require('./config/config.json').decompressRoutes;

const multi = new Multiprogress(process.stderr);

const processRoute = (fileName) => {
  const outputFilePath = generateFileName(
    fileName,
    compressedExtension,
    decompressedExtension
  );
  const sourceUrl = sourceFolder + fileName;
  const destinationUrl = destinationFolder + outputFilePath;
  decompressFile(sourceUrl, destinationUrl, multi, fileName);
};

readdirSync(sourceFolder).forEach(processRoute);
