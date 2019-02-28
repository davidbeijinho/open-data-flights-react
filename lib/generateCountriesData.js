const config = require('./config/config.json');
const writeFile = require('./utils/writeFile');
const processFile = require('./utils/processFile.js');

function processFiltredAirports(data, destination) {
  destination[data.iso_country] = data.iso_country;
  return destination;
}

function processCountries(data, destination) {
  if (destination[data.Code]) {
    destination[data.Code] = {
     code: data.Code,
     name: data.Name,
    };
  }
  return destination;
}

processFile
  .process(config.filtredCountries.filtredAirportsFileName, processFiltredAirports, {})
  .then(data => {
    processFile
      .process(config.filtredCountries.countriesFileName, processCountries, data)
      .then(data => {
        const allCountries = Object.values(data);
        const missingCountries = allCountries.filter(v => typeof v === 'string');
        const filtredCountries = allCountries.filter(v => typeof v !== 'string');
        console.log('Countries processed:', allCountries.length);
        console.log('Countries missing:', missingCountries.length);
        console.log('Countries filtred:', filtredCountries.length);
        writeFile.writeFile(
          config.filtredCountries.missingFileName,
          missingCountries
        );
        writeFile.writeFile(
          config.filtredCountries.filtredFileName,
          filtredCountries
        );
      });
  });
