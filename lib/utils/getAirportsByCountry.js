const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

function processFile(inputName) {
  const readStream = fs.createReadStream(inputName);
  const allDdata = {
    airports: {
      departure: [],
      arrival: []
    },
    countries: []
  };

  readStream.pipe(JSONStream.parse('*')).pipe(
    es.mapSync((data) => {
      processData(data, allDdata);
    })
  );

  return new Promise((resolve, reject) => {
    readStream.on('end', () => {
      resolve(allDdata);
    })
    .on('error', (err) => {
      reject(err);
      console.log('ERROR reading file');
    });
  });
}

function processData(data, destination) {
  destination.airports.departure.push({
    country: data.departureCountry,
    id: data.departureAiport
  });
  destination.airports.arrival.push({
    country: data.arrivalCountry,
    id: data.arrivalAiport
  });
  destination.countries.push(data.departureCountry, data.arrivalCountry);
}

module.exports = {
  processFile
};
