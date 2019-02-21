const fs = require('fs');
const getAirportsByCountry = require('./utils/getAirportsByCountry.js');
const config = require('./config/config.json');
const uniq = require('lodash.uniq');
const uniqBy = require('lodash.uniqby');

const writeFile = require('./utils/writeFile');

const data = fs
  .readdirSync(config.activeAirports.sourceFolder)
  .map(fileName => {
    return getAirportsByCountry.processFile(
      config.activeAirports.sourceFolder + fileName
    );
  });

Promise.all(data).then(results => {
  let mergedData = {
    airports: {
      departure: [],
      arrival: []
    },
    countries: []
  };

  results.forEach(value => {
    mergedData.countries = [...mergedData.countries, ...value.countries];
    mergedData.airports.departure = [
      ...mergedData.airports.departure,
      ...value.airports.departure
    ];
    mergedData.airports.arrival = [
      ...mergedData.airports.arrival,
      ...value.airports.arrival
    ];
  });
  mergedData = {
    countries: uniq(mergedData.countries),
    airports: {
      departure: uniqBy(mergedData.airports.departure, 'id'),
      arrival: uniqBy(mergedData.airports.arrival, 'id'),
    }
  };
  writeFile.writeFile(
    './data/airports/departure.json',
    mergedData.airports.departure
  );
  writeFile.writeFile(
    './data/airports/arrival.json',
    mergedData.airports.arrival
  );
  writeFile.writeFile('./data/countries/countries.json', mergedData.countries);
});
