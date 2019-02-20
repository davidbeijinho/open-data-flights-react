const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

function processFile(inputFile, outputName) {    
    const instream = fs.createReadStream(inputFile);
    const outstream = new (stream)();
    const readLine = readline.createInterface(instream, outstream);
    const data = [];
    readLine
        .on('line', (line) => {
            data.push(line.split(',').reduce((acc, current, index) => { 
                 acc[names[index]] = current.replace(/"/g, '');
                 if (namesNumber.indexOf(names[index]) !== -1) {
                    acc[names[index]] = parseInt(acc[names[index]]);
                 } else if (namesFloat.indexOf(names[index]) !== -1) {
                    acc[names[index]] = parseFloat(acc[names[index]]);
                 }
                 return acc;
            }, {}));
        })
        .on('error', (err) => {
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

const namesNumber = [
    'id',
    'timezone',
];

const namesFloat = [
    'lat',
    'long',
    'altitude', // 	In feet.
];

const names = [
    namesNumber[0],
    'name',
    'city',
    'country',
    'IATA',
    'ICAO',
    namesFloat[0],
    namesFloat[1],
    namesFloat[2],
    namesNumber[1],
    'DST',
    'tz',
    'type',
    'source',
];

// Airport ID	Unique OpenFlights identifier for this airport.
// Name	Name of airport. May or may not contain the City name.
// City	Main city served by airport. May be spelled differently from Name.
// Country	Country or territory where airport is located. See countries.dat to cross-reference to ISO 3166-1 codes.
// IATA	3-letter IATA code. Null if not assigned/unknown.
// ICAO	4-letter ICAO code. Null if not assigned.
// Latitude	Decimal degrees, usually to six significant digits. Negative is South, positive is North.
// Longitude	Decimal degrees, usually to six significant digits. Negative is West, positive is East.
// Altitude	In feet.
// Timezone	Hours offset from UTC. Fractional hours are expressed as decimals, eg. India is 5.5.
// DST	Daylight savings time. One of E (Europe), A (US/Canada), S (South America), O (Australia), Z (New Zealand), N (None) or U (Unknown). See also: Help: Time
// Tz database time zone	Timezone in "tz" (Olson) format, eg. "America/Los_Angeles".
// Type	Type of the airport. Value "airport" for air terminals, "station" for train stations, "port" for ferry terminals and "unknown" if not known. In airports.csv, only type=airport is included.
// Source	Source of this data. "OurAirports" for data sourced from OurAirports, "Legacy" for old data not matched to OurAirports (mostly DAFIF), "User" for unverified user contributions. In airports.csv, only source=OurAirports is included.