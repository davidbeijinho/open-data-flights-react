const Multiprogress = require("multi-progress");
const downloadFile = require('./utils/downloadFile');
const config = require('./config/config.json');
const fileList = require('../data/files.json');

const multi = new Multiprogress(process.stderr);

fileList.forEach(info => {
  const destinationUrl = config.downloadRoutes.destinationFolder + info.fileName;
  downloadFile.download(info.url, destinationUrl, multi, info.fileName);
});
