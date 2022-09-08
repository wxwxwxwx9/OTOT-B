const https = require('https');

const API_URL = "https://api.data.gov.sg/v1/transport/carpark-availability";
const HOST = "api.data.gov.sg";
const PATH = "/v1/transport/carpark-availability";

const getCarparkAvai = () => {
    return new Promise((resolve, reject) => {
        const options = {
            host: HOST,
            headers: {
                'Content-Type': 'application/json',
            },
            path: PATH, 
            method: 'GET',
        }; 
        const req = https.request(options, res => {
            let buffer = "";
            res.on('data', chunk => buffer += chunk);
            res.on('end', () => resolve(JSON.parse(buffer)));
        });
        req.on('error', e => reject(e.message));
        req.write(JSON.stringify(''));
        req.end();
    });
};

exports.handler = async (event) => {
    const res = await getCarparkAvai();
    const carparks = res.items[0].carpark_data;
    const min = event.queryStringParameters.min;
    console.log(event.queryStringParameters.min);
    // console.log(carparks.length);
    const filteredCarparks = carparks.filter((carpark) => {
        const carparkInfo = carpark.carpark_info[0];
        return carparkInfo.lots_available >= min;
    });
    // console.log(filteredCarparks.length);
    // console.log(filteredCarparks);
    const response = {
        statusCode: 200,
        body: JSON.stringify(filteredCarparks),
    };
    return response;
};
