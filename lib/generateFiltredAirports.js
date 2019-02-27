const config = require('./config/config.json');
const writeFile = require('./utils/writeFile');
const processFile = require('./utils/processFile.js');

processFile
  .process(
    config.filtredAirports.sourceActiveFileName,
    processActiveAirports,
    {}
  )
  .then(results => {
    processFile
      .process(
        config.filtredAirports.sourceAirportsDataFileName,
        processAllAirports,
        results
      )
      .then(data => {
        console.log('Airports processed:', Object.keys(data).length);
        writeFile.writeFile(config.filtredAirports.destinationFileName, data);
      });
  });

function processActiveAirports(data, destination) {
  destination[data.id] = data.id;
  return destination;
}

function processAllAirports(data, destination) {
  if (destination[data.ident]) {
    destination[data.ident] = data;
  }
  return destination;
}
