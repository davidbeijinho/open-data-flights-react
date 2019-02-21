const downloadFile = require('./utils/downloadFile');
const Multiprogress = require("multi-progress");
const config = require('./config/config.json');

const multi = new Multiprogress(process.stderr);

downloadFile.download(
  config.airportsData.url,
  config.airportsData.destinationFolder + config.airportsData.fileName,
  multi,
  config.airportsData.fileName,
);
