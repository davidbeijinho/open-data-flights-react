const { airportsData } = require('./config/config.json');
const {
  downloadFileWithProgress
} = require('./utils/downloadFileWithProgress.js');

downloadFileWithProgress(airportsData);
