const { readdirSync } = require('fs');
const { processFile } = require('./utils/parseRoute');
const Multiprogress = require('multi-progress');
const { generateFileName } = require('./utils/generateFileName');

const {
  sourceFolder,
  originalExtension,
  parseddExtension,
  destinationFolder
} = require('./config/config.json').parseRoutes;

const multi = new Multiprogress(process.stderr);

const parseRoute = fileName => {
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
