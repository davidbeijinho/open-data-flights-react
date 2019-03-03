const { countriesData } = require('./config/config.json');
const {
  downloadFileWithProgress
} = require('./utils/downloadFileWithProgress.js');

downloadFileWithProgress(countriesData);
