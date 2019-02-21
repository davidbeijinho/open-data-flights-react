const fs = require('fs');
const processFile = require('./utils/processFile');
const Multiprogress = require("multi-progress");

const sourceFolder = './data/raw/';
const destinationFolder = './data/processed/';
const multi = new Multiprogress(process.stderr);

fs.readdirSync(sourceFolder).forEach(file => {
  const outputFilePath = file.replace('.tsv', '.json');
  processFile.processFile(
    sourceFolder + file,
    destinationFolder + outputFilePath,
    multi
  );
});
