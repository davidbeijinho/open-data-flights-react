const Multiprogress = require("multi-progress");
const downloadFile = require('./utils/downloadFile');
const fileList = require('../data/files.json');

const destinationFolder = './data/downloaded/';
const multi = new Multiprogress(process.stderr);

fileList.forEach(url => {
  const name = url.split('/').pop();
  const destinationUrl = destinationFolder + name;
  downloadFile.download(url, destinationUrl, multi, name);
});
