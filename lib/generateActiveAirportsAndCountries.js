const fs = require('fs');
const uniq = require('lodash.uniq');
const uniqBy = require('lodash.uniqby');
const cloneDeep = require('lodash.clonedeep');
const config = require('./config/config.json');
const processFile = require('./utils/processFile.js');
const writeFile = require('./utils/writeFile.js');

const dataStructure = {
  airports: {
    departure: [],
    arrival: []
  },
  countries: []
};

const processData = (data, destination) => {
  destination.airports.departure.push({
    country: data.departure.country,
    id: data.departure.airport
  });
  destination.airports.arrival.push({
    country: data.arrival.country,
    id: data.arrival.airport
  });
  destination.countries.push(data.departure.country, data.arrival.country);
  return destination;
};

const data = fs
  .readdirSync(config.activeAirports.sourceFolder)
  .map(fileName => {
    return processFile.process(
      config.activeAirports.sourceFolder + fileName,
      processData,
      cloneDeep(dataStructure)
    );
  });

Promise.all(data).then(results => {
  let mergedData = cloneDeep(dataStructure);

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
      arrival: uniqBy(mergedData.airports.arrival, 'id')
    }
  };
  const allAirports = uniqBy(
    [...mergedData.airports.departure, ...mergedData.airports.arrival],
    'id'
  );
  writeFile.writeFile(config.activeAirports.fileName, allAirports);
  writeFile.writeFile(
    config.activeAirports.deparuteFileName,
    mergedData.airports.departure
  );
  writeFile.writeFile(
    config.activeAirports.arrivalFileName,
    mergedData.airports.arrival
  );
  writeFile.writeFile(config.activeCountries.fileName, mergedData.countries);
  console.log('Countires processed:', mergedData.countries.length);
  console.log('Airports processed:', allAirports.length);
  console.log('Airports departure:', mergedData.airports.departure.length);
  console.log('Airports arrival:', mergedData.airports.arrival.length);
});
