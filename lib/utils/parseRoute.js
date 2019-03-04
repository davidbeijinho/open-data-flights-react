const { createReadStream } = require('fs');
const parse = require('csv-parse');
const { logger } = require('./logger.js');
const { insertData } = require('./processRoute.js');
const { writeFile } = require('./writeFile.js');

const writeFiles = (baseName, data) => {
  Object.entries(data).forEach(([fileName, value]) => {
    writeFile(baseName.replace('.json', `_${fileName}.json`), value);
  });
};

const processFile = (inputName, outputName) => {
  const readStream = createReadStream(inputName);
  const parser = parse({
    parse: true,
    columns: true,
    delimiter: '\t',
    trim: true,
    skip_lines_with_empty_values: true,
    skip_empty_lines: true
  });
  let output = {};

  readStream.pipe(parser);

  parser
    .on('readable', () => {
      output = insertData(parser.read(), output);
    })
    .on('error', (err) => {
      logger.log('error', 'ERROR PARSER', err);
    })
    .on('end', () => {
      parser.end();
      writeFiles(outputName, output);
      logger.log('info', `End parser: ${inputName}`);
    });
};

module.exports = {
  processFile
};
