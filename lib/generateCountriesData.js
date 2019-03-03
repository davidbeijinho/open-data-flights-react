const { writeFiltredAndMissing } = require('./utils/writeFiltredAndMissing');
const { processFile } = require('./utils/processFile');
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
  if (destination[Code]) {
    destination[Code] = {
      code: Code,
      name: Name
    };
  }
  return destination;
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
