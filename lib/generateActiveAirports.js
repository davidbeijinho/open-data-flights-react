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
  const allAiports = uniqBy([...mergedData.airports.departure, ...mergedData.airports.arrival], 'id');
  writeFile.writeFile(
    config.activeAirports.fileName,
    allAiports,
  );
  writeFile.writeFile(
    config.activeAirports.deparuteFileName,
    mergedData.airports.departure
  );
  writeFile.writeFile(
    config.activeAirports.arrivalFileName,
    mergedData.airports.arrival
  );
  writeFile.writeFile(
    config.activeCountries.fileName, 
    mergedData.countries
  );
  console.log('Countires processed:', mergedData.countries.length);
  console.log('Airports processed:',  allAiports.length);
  console.log('Airports departure:', mergedData.airports.departure.length);
  console.log('Airports arrival:', mergedData.airports.arrival.length);
});
