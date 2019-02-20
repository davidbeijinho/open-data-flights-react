const downloadFile = require('./utils/downloadFile');

downloadFile.download(
  'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat',
  './data/airports.dat'
);
