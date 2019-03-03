const {
  downloadFileWithProgress
} = require('./utils/downloadFileWithProgress');
const countriesData = require('./config/config.json').countriesData;

downloadFileWithProgress(countriesData);
