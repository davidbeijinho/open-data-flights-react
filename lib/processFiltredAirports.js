const processFile = require('./utils/processFile.js');
const config = require('./config/config.json');
const writeFile = require('./utils/writeFile');

processFile
  .process(
    config.processFiltredAirports.sourceActiveFileName,
    processFiltredAirports,
    {
      parsed: [],
      missing: []
    }
  )
  .then(results => {
    console.log('Airports processed:', results.parsed.length);
    console.log('Airports missing:', results.missing.length);
    writeFile.writeFile(
      config.processFiltredAirports.destinationFileName,
      results.parsed
    );
    writeFile.writeFile(
      config.processFiltredAirports.missingFileName,
      results.missing
    );
  });

function processFiltredAirports(data, destination) {
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
      type: data.type
    });
  }
  return destination;
}
