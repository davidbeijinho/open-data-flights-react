const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

function processFile(inputFile, outputName) {
  const instream = fs.createReadStream(inputFile);
  const outstream = new stream();
  const readLine = readline.createInterface(instream, outstream);
  const data = [];
  readLine
    .on('line', line => {
      data.push(
        line.split(',').reduce((acc, current, index) => {
          acc[dataFormat[index].key] = processField(current.replace(/"/g, ''), dataFormat[index]);
          return acc;
        }, {})
      );
    })
    .on('error', err => {
      console.log('Error reading line', err);
    })
    .on('close', () => {
      const writeStream = fs.createWriteStream(outputName);
      writeStream.write(JSON.stringify(data));
      writeStream.end();
      console.log('Done reading file.');
    });
}
processFile('./data/airports.dat', './data/airports.json');

function processField(data, format) {
  if (format.type === 'number') {
    return parseInt(data);
  } else if (format.type === 'float') {
    return parseFloat(data);
  } 
  return data;
}

const dataFormat = [
  {
    key: 'id',
    type: 'number'
  },
  {
    key: 'name',
    type: 'string'
  },
  {
    key: 'city',
    type: 'string'
  },
  {
    key: 'country',
    type: 'string'
  },
  {
    key: 'IATA',
    type: 'string'
  },
  {
    key: 'ICAO',
    type: 'string'
  },
  {
    key: 'latitude',
    type: 'float'
  },
  {
    key: 'longitude',
    type: 'float'
  },
  {
    key: 'altitude', // 	In feet.
    type: 'float'
  }, 
  {
    key: 'timezone',
    type: 'number'
  },
  {
    key: 'DST',
    type: 'string'
  },
  {
    key: 'tz',
    type: 'string'
  },
  {
    key: 'type',
    type: 'string'
  },
  {
    key: 'source',
    type: 'string'
  }
];

