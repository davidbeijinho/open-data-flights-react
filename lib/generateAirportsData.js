/* eslint camelcase: ["error", {allow: ["iata_code", "iso_country"]}] */
const { readdirSync } = require('fs');
const uniq = require('lodash.uniq');
const {
  routesSourceFolder,
  sourceAirportsDataFileName,
  missingFileName,
  filtredFileName
} = require('./config/config.json').filtredAirports;
const { writeFiltredAndMissing } = require('./utils/writeFiltredAndMissing.js');
const { processFile } = require('./utils/processFile.js');

const processRoute = ({ departure, arrival }, destination) => [
  ...destination,
  departure.airport,
  arrival.airport
];

const flatArray = (data) => data.reduce((acc, val) => acc.concat(val), []);

const setAirportData = (destination, data) => ({
  ...destination,
  [data]: data
});

const getActiveAirports = (data) =>
  uniq(flatArray(data)).reduce(setAirportData, {});

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

const processAllAirports = (data, destination) => {
  let processed = destination;
  if (destination[data.ident]) {
    processed = {
      ...destination,
      [data.ident]: parseAirportData(data)
    };
  }
  return processed;
};

const processRouteFile = (fileName) =>
  processFile(routesSourceFolder + fileName, processRoute, []);

const data = readdirSync(routesSourceFolder).map(processRouteFile);

const generateCountriesData = async (results) => {
  const activeAirports = await processFile(
    sourceAirportsDataFileName,
    processAllAirports,
    getActiveAirports(results)
  );

  writeFiltredAndMissing(
    activeAirports,
    missingFileName,
    filtredFileName,
    'Airports'
  );
};

Promise.all(data).then(generateCountriesData);
