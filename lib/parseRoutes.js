const fs = require('fs');
const processFile = require('./utils/processFile');
const Multiprogress = require("multi-progress");
const config = require('./config/config.json');

const multi = new Multiprogress(process.stderr);

fs.readdirSync(config.parseRoutes.sourceFolder).forEach(file => {
  const outputFilePath = file.replace(config.parseRoutes.originalExtension, config.parseRoutes.parseddExtension);
  processFile.processFile(
    config.parseRoutes.sourceFolder + file,
    config.parseRoutes.destinationFolder + outputFilePath,
    multi
  );
});
