const fs = require('fs');

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
    writeFile,
};