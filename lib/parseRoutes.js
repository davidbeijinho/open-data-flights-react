const Multiprogress = require('multi-progress');
const { readdirSync } = require('fs');
const { processFile } = require('./utils/parseRoute.js');
const { generateFileName } = require('./utils/generateFileName.js');

const {
  sourceFolder,
  originalExtension,
  parseddExtension,
  destinationFolder
} = require('./config/config').parseRoutes;

const multi = new Multiprogress(process.stderr);

const parseRoute = (fileName) => {
  const outputFilePath = generateFileName(
    fileName,
    originalExtension,
    parseddExtension
  );
  const sourceUrl = sourceFolder + fileName;
  const destinationUrl = destinationFolder + outputFilePath;

  processFile(sourceUrl, destinationUrl, multi);
};

readdirSync(sourceFolder).forEach(parseRoute);
