const processActiveAirports = require('./utils/processActiveAirports.js');
const processAllAirports = require('./utils/processAllAirports.js');
const config = require('./config/config.json');
const writeFile = require('./utils/writeFile');

processActiveAirports.processFile(config.filtredAirports.sourceActiveFileName).then(results => {
  processAllAirports.processFile(config.filtredAirports.sourceAirportsDataFileName, results).then((data) => {
    console.log('Airports processed:', Object.keys(data).length);
    writeFile.writeFile(config.filtredAirports.destinationFileName, data);
  });
});
