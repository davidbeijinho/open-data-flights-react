const { countriesData } = require('./config/config');
const {
  downloadFileWithProgress
} = require('./utils/downloadFileWithProgress');

downloadFileWithProgress(countriesData);
