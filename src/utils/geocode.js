const request = require("request");
const geoCode = (adress, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/ " + encodeURIComponent(adress) + ".json?access_token=pk.eyJ1IjoiZG9zdTE5OTYiLCJhIjoiY2tlenJrZm4yMGNlZTJxcDdodXc4cHVhMCJ9.-nhcjk2Xisgn-UdFoMepCg&limit=1";
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback("Unable to connect to geocoding service!", undefined);
        else if (body.features.length == 0)
            callback("Not found. Try another search", undefined);
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geoCode;