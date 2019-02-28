const config = require('./config/config.json');
const writeFile = require('./utils/writeFile');
const processFile = require('./utils/processFile.js');
const uniq = require('lodash.uniq');
const fs = require('fs');

const processRoute = (data, destination) => {
  destination.push(data.departure.airport, data.arrival.airport);
  return destination;
};

function getActiveAirports(data) {
  return uniq(data.reduce((acc, val) => acc.concat(val), [])).reduce(
    (destination, data) => {
      destination[data] = data;
      return destination;
    },
    {}
  );
}

function processAllAirports(data, destination) {
  if (destination[data.ident]) {
    destination[data.ident] = parseAirportData(data);
  }
  return destination;
}

function parseAirportData(data) {
  const coordinates = data.coordinates.split(',');
  return {
    continent: data.continent,
    longitude: parseFloat(coordinates[0]),
    latitude: parseFloat(coordinates[1]),
    iata_code: data.iata_code,
    ident: data.ident,
    iso_country: data.iso_country,
    name: data.name,
    type: data.type
  };
}

const data = fs
  .readdirSync(config.filtredAirports.routesSourceFolder)
  .map(fileName => {
    return processFile.process(
      config.filtredAirports.routesSourceFolder + fileName,
      processRoute,
      []
    );
  });

Promise.all(data).then(results => {
  processFile
    .process(
      config.filtredAirports.sourceAirportsDataFileName,
      processAllAirports,
      getActiveAirports(results)
    )
    .then(data => {
      const allAirports = Object.values(data);
      const missingAirports = allAirports.filter(v => typeof v === 'string');
      const filtredAirports = allAirports.filter(v => typeof v !== 'string');
      console.log('Airports processed:', allAirports.length);
      console.log('Airports missing:', missingAirports.length);
      console.log('Airports filtred:', filtredAirports.length);
      writeFile.writeFile(
        config.filtredAirports.missingFileName,
        missingAirports
      );
      writeFile.writeFile(
        config.filtredAirports.filtredFileName,
        filtredAirports
      );
    });
});