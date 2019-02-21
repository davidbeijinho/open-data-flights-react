const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

function processFile(inputName) {
  const readStream = fs.createReadStream(inputName);
  const allDdata = {
    parsed: [],
    missing: [],
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
  
  if (typeof data === 'string') {
    destination.missing.push(data);
  } else {
    const coordinates = data.coordinates.split(',');
    destination.parsed.push({
      continent: data.continent,
      longitude: parseFloat(coordinates[0]),
      latitude: parseFloat(coordinates[1]),
      iata_code: data.iata_code,
      ident: data.ident,
      iso_country: data.iso_country,
      name: data.name,
      type: data.type,
    });
  }
  
}

module.exports = {
  processFile
};
