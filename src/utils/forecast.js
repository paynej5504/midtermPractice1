const request = require("request");
const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bf85aeb351160c851bca503f647cb13c&query=" + latitude + "," + longitude + "&units=m";

    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback("Unable to connect to wather service!", undefined)
        else if (body.error)
            callback("Unable to find location", undefined)
        else {
            callback(undefined,`${body.current.weather_descriptions[0]}. Current temaperature is ${body.current.temperature} but feelslike ${body.current.feelslike} and humidity is ${body.current.humidity}%`)
        }
    })
}

module.exports = forecast;