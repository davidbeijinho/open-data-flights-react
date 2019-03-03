const { downloadFile } = require('./downloadFile');
const Multiprogress = require('multi-progress');

const downloadFileWithProgress = ({ destinationFolder, fileName, url }) => {
  const multi = new Multiprogress(process.stderr);
  const destinationUrl = destinationFolder + fileName;

  downloadFile(url, destinationUrl, multi, fileName);
};

module.exports = {
  downloadFileWithProgress
};
