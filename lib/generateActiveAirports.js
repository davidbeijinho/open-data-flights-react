const fs = require('fs');
const uniq = require('lodash.uniq');
const config = require('./config/config.json');
const processFile = require('./utils/processFile.js');
const writeFile = require('./utils/writeFile.js');

const processData = (data, destination) => {
  destination.push(data.departure.airport, data.arrival.airport);
  return destination;
};

const data = fs
  .readdirSync(config.activeAirports.routesSourceFolder)
  .map(fileName => {
    return processFile.process(
      config.activeAirports.routesSourceFolder + fileName,
      processData,
      []
    );
  });

Promise.all(data).then(results => {
  const mergedData = uniq(results.reduce((acc, val) => acc.concat(val), []));
  writeFile.writeFile(config.activeAirports.destinationFileName, mergedData);
  console.log('Airports processed:', mergedData.length);
});
