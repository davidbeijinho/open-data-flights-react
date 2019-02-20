const fs = require('fs');
const parse = require('csv-parse');
const processData = require('./processData');

function processFile(inputName, outputName) {
    const readStream = fs.createReadStream(inputName);
    const parser = parse({
        parse: true,
        // columns: true,
        // cast: true,
        columns: true,
        delimiter: '\t',
        trim: true,
        skip_lines_with_empty_values: true,
        skip_empty_lines: true,
    });
    const output = {};

    readStream
        .on('data', (data) => {
            parser.write(data);
        })
        .on('error', () => {
            console.log('ERROR READ STREAM');
        })
        .on('end', () => {
            parser.end();
            console.log('END READ STREAM');
        });



    parser
        .on('readable', () => {
            processData.insertData(parser.read(), output);
        })
        .on('error', (err) => {
            console.error('ERROR PARSER', err)
        })
        .on('end', () => {
            parser.end();
            writeFile(outputName.replace('.json', '_SEAT.json', ), output['SEAT']);
            writeFile(outputName.replace('.json', '_PAS.json', ), output['PAS'])
            writeFile(outputName.replace('.json', '_FLIGHT.json', ), output['FLIGHT'])
            console.log('END PARSER');
   
        });
}

function writeFile(url, data) {
    const writeStream = fs.createWriteStream(url);

    writeStream
        .on('error', () => {
            console.log('ERROR WRITE STREAM');
        })
        .on('end', () => {
            console.log('END WRITE STREAM');
        });

    writeStream.write(JSON.stringify(data));
    writeStream.end();
}

module.exports = {
    processFile,
};

