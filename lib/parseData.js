const fs = require('fs');
const processFile = require('./utils/processFile');
const Multiprogress = require("multi-progress");
const config = require('./config/config.json');

const multi = new Multiprogress(process.stderr);

fs.readdirSync(config.parseData.sourceFolder).forEach(file => {
  const outputFilePath = file.replace(config.parseData.originalExtension, config.parseData.parseddExtension);
  processFile.processFile(
    config.parseData.sourceFolder + file,
    config.parseData.destinationFolder + outputFilePath,
    multi
  );
});
