const processFiltredAirports = require('./utils/processFiltredAirports.js');
const config = require('./config/config.json');
const writeFile = require('./utils/writeFile');

processFiltredAirports.processFile(config.processFiltredAirports.sourceActiveFileName).then(results => {
  console.log('Airports processed:', results.parsed.length);
  console.log('Airports missing:', results.missing.length);
  writeFile.writeFile(config.processFiltredAirports.destinationFileName, results.parsed);
  writeFile.writeFile(config.processFiltredAirports.missingFileName, results.missing);
});
