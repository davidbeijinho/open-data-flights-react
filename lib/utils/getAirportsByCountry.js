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
  console.log(data);
  destination.airports.departure.push({
    country: data.departure.country,
    id: data.departure.airport
  });
  destination.airports.arrival.push({
    country: data.arrival.country,
    id: data.arrival.airport
  });
  destination.countries.push(data.departure, data.arrival);
}

module.exports = {
  processFile
};
