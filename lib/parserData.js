
const fs = require('fs');
const processFile = require('./utils/processFile');

const sourceFolder = './data/raw/';
const destinationFolder = './data/processed/';

fs.readdirSync(sourceFolder).forEach(file => {
    const outputFilePath = file.replace(".tsv", ".json");
    processFile.processFile(sourceFolder + file, destinationFolder + outputFilePath);
});
