const {
  routesSourceFolder,
  sourceAirportsDataFileName,
  missingFileName,
  filtredFileName
} = require('./config/config.json').filtredAirports;
const writeFile = require('./utils/writeFile');
const processFile = require('./utils/processFile.js');
const uniq = require('lodash.uniq');
const fs = require('fs');

const processRoute = ({ departure, arrival }, destination) => [
  ...destination,
  departure.airport,
  arrival.airport
];

const flatArray = data => data.reduce((acc, val) => acc.concat(val), []);
const setAirportData = (destination, data) => ({
  ...destination,
  [data]: data
});
const getActiveAirports = data =>
  uniq(flatArray(data)).reduce(setAirportData, {});

const processAllAirports = (data, destination) => {
  if (destination[data.ident]) {
    destination[data.ident] = parseAirportData(data);
  }
  return destination;
};

const parseAirportData = ({
  continent,
  iata_code,
  ident,
  iso_country,
  name,
  type,
  coordinates
}) => {
  const coordinatesData = coordinates.split(',');
  return {
    continent,
    longitude: parseFloat(coordinatesData[0]),
    latitude: parseFloat(coordinatesData[1]),
    iata_code,
    ident,
    iso_country,
    name,
    type
  };
};

const data = fs.readdirSync(routesSourceFolder).map(fileName => {
  return processFile.process(routesSourceFolder + fileName, processRoute, []);
});

Promise.all(data).then(results => {
  processFile
    .process(
      sourceAirportsDataFileName,
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
      writeFile.writeFile(missingFileName, missingAirports);
      writeFile.writeFile(filtredFileName, filtredAirports);
    });
});
