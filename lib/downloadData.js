const Multiprogress = require("multi-progress");
const downloadFile = require('./utils/downloadFile');
const config = require('./config/config.json');
const fileList = require('../data/files.json');

const multi = new Multiprogress(process.stderr);

fileList.forEach(url => {
  const name = url.split('/').pop();
  const destinationUrl = config.downloadData.destinationFolder + name;
  downloadFile.download(url, destinationUrl, multi, name);
});
