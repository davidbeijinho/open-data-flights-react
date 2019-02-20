const downloadFile = require('./utils/downloadFile');
const fileList = require('../data/files.json');

const destinationFolder = './data/downloaded/';

fileList.forEach(url => {
  const destinationUrl = destinationFolder + url.split('/').pop();
  console.log(url, destinationUrl);
  downloadFile.download(url, destinationUrl);
});
