const { airportsData } = require('./config/config');
const {
  downloadFileWithProgress
} = require('./utils/downloadFileWithProgress');

downloadFileWithProgress(airportsData);
