const downloadFile = require('./utils/downloadFile');
const Multiprogress = require("multi-progress");

const multi = new Multiprogress(process.stderr);

downloadFile.download(
  'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat',
  './data/airports.dat',
  multi,
  'airports.dat',
);
