const downloadFile = require('./utils/downloadFile');
const Multiprogress = require("multi-progress");
const config = require('./config/config.json');

const multi = new Multiprogress(process.stderr);

downloadFile.download(
  config.countriesData.url,
  config.countriesData.destinationFolder + config.countriesData.fileName,
  multi,
  config.countriesData.fileName,
);
