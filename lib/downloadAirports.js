const {
  downloadFileWithProgress
} = require('./utils/downloadFileWithProgress');
const airportsData = require('./config/config.json').airportsData;

downloadFileWithProgress(airportsData);
