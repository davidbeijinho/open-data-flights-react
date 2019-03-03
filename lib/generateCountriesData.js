const {
  filtredAirportsFileName,
  countriesFileName,
  missingFileName,
  filtredFileName
} = require('./config/config.json').filtredCountries;
const { writeFile } = require('./utils/writeFile');
const { processFile } = require('./utils/processFile.js');

const processFiltredAirports = ({ iso_country }, destination) => {
  destination[iso_country] = iso_country;
  return destination;
};

const processCountries = ({ Code, Name }, destination) => {
  if (destination[Code]) {
    destination[Code] = {
      code: Code,
      name: Name
    };
  }
  return destination;
};

const wirteCountriesFile = (fileName, data, label) => {
  console.log(label);
  writeFile(fileName, data);
};

const processCountry = (acc, v) => {
  acc[typeof v === 'string' ? 'missingCountries' : 'filtredCountries'].push(v);
  return acc;
};

const generateCountriesData = async () => {
  const filteredCountries = await processFile(
    filtredAirportsFileName,
    processFiltredAirports,
    {}
  );
  const countriesData = await processFile(
    countriesFileName,
    processCountries,
    filteredCountries
  );
  const allCountries = Object.values(countriesData);

  const { missingCountries, filtredCountries } = allCountries.reduce(
    processCountry,
    { missingCountries: [], filtredCountries: [] }
  );

  console.log('Countries processed:', allCountries.length);

  wirteCountriesFile(
    missingFileName,
    missingCountries,
    `Countries filtred: ${missingCountries.length}`
  );
  wirteCountriesFile(
    filtredFileName,
    filtredCountries,
    `Countries filtred: ${filtredCountries.length}`
  );
};

generateCountriesData();
