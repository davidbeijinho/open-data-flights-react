function insertData(data, destination) {
    if (data) {
        const processedData= processHeader(cleanData(data));
        if (destination[processedData.tra_meas]) {
            destination[processedData.tra_meas].push(processedData);
        } else {
            destination[processedData.tra_meas] = [processedData];
        }
            
    }
}

function cleanData(data) {
    for (let property in data) {
        if (data[property] === ':') {
            delete data[property];
        }
    }
    return data;
}

function processHeader(data) {
    const key = 'unit,tra_meas,airp_pr\\time';
    const keys = key.split(',');
    const values = data[key].split(',');
    delete data[key];
    keys.forEach((value, index) => {
        data[value] = values[index];
    });

    return splitAirports(data);
}

function splitAirports(data) {
    const key = 'airp_pr\\time';
    const info = data[key].split('_');
    delete data[key];
    return {
        departureCountry: info[0],
        departureAiport: info[1],
        destinationCountry: info[2],
        destinationAiport: info[3],
        ...data
    };
}

module.exports = {
    insertData,
};