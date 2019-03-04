/* eslint camelcase: ["error", {allow: ["iso_country"]}] */
const { writeFiltredAndMissing } = require('./utils/writeFiltredAndMissing.js');
const { processFile } = require('./utils/processFile.js');
const {
  filtredAirportsFileName,
  countriesFileName,
  missingFileName,
  filtredFileName
} = require('./config/config').filtredCountries;

const processFiltredAirports = ({ iso_country }, destination) => ({
  ...destination,
  [iso_country]: destination
});

const processCountries = ({ Code, Name }, destination) => {
  const processData = destination;
  if (processData[Code]) {
    processData[Code] = {
      code: Code,
      name: Name
    };
  }
  return processData;
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

  writeFiltredAndMissing(
    countriesData,
    missingFileName,
    filtredFileName,
    'Countries'
  );
};

generateCountriesData();
