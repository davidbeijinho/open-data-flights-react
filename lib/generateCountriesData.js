/* eslint camelcase: ["error", {allow: ["iso_country"]}] */
const { writeFiltredAndMissing } = require('./utils/writeFiltredAndMissing.js');
const { processFile } = require('./utils/processFile.js');
const { filtredCountries, activeCountries } = require('./config/config.json');

const processAirports = ({ iso_country, downloadCode }, destination) => ({
  ...destination,
  [iso_country]: downloadCode || iso_country
});

const processCountries = ({ Code, Name }, destination) => {
  const processData = destination;
  if (processData[Code]) {
    processData[Code] = {
      code: Code,
      name: Name,
      downloadCode: processData[Code]
    };
  }
  return processData;
};

const generateCountriesData = async ({
  label,
  missingFileName,
  filtredFileName,
  sourceFileName,
  countriesFileName
}) => {
  const filteredCountries = await processFile(
    sourceFileName,
    processAirports,
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
    label
  );
};

generateCountriesData({
  label: 'Filtred Countries',
  ...filtredCountries
});

generateCountriesData({
  label: 'Active Countries',
  ...activeCountries
});
