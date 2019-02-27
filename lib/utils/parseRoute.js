const fs = require('fs');
const parse = require('csv-parse');
const processRoute = require('./processRoute');
const bars = require('./bars');
const writeFile = require('./writeFile');

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

    readStream.pipe(parser);

    parser
        .on('readable', () => {
            processRoute.insertData(parser.read(), output);
        })
        .on('error', (err) => {
            console.error('ERROR PARSER', err)
        })
        .on('end', () => {
            parser.end();
            Object.keys(output).forEach((value) => {
                writeFile.writeFile(outputName.replace('.json', `_${value}.json`, ), output[value]);
            });
            console.log('END PARSER');
   
        });
}

module.exports = {
    processFile,
};

