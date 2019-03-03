const Multiprogress = require('multi-progress');
const { downloadFile } = require('./utils/downloadFile.js');
const { destinationFolder } = require('./config/config.json').downloadRoutes;
const fileList = require('../data/files');

const multi = new Multiprogress(process.stderr);

const processFile = (info) => {
  const { url, fileName } = info;
  const destinationUrl = destinationFolder + fileName;
  downloadFile(url, destinationUrl, multi, fileName);
};

fileList.forEach(processFile);
