const request = require('request');
const promisify = require("es6-promisify");
const promisedRequest = promisify(request);

class WeatherRequester {
    constructor() {}

    getWeather(city) {
        const options = {
            method: "GET",
            uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=181b87b60705ae59e14754992d5f2f48`
        };
        return promisedRequest(options);
    }

    getWeatherInSeries() {
        let kyivWeather, kharkivWeather;
        return this.getWeather('Kyiv')
            .then(result => {
                kyivWeather = result.body;
            })
            .then(() => {
                return this.getWeather('Kharkov');
            })
            .then(result => {
                kharkivWeather = result.body;
                return {kyivWeather, kharkivWeather};
            })
            .catch(err => console.error(err));
    };

    getWeatherInParallel() {
        return Promise.all([this.getWeather('Kyiv'), this.getWeather('Kharkiv')])
            .then(result => {
                return {
                    kyivWeather: result[0].body,
                    kharkivWeather: result[1].body
                }
            })
            .catch(err => console.error(err));
    }
}

const weather = new WeatherRequester();

weather.getWeatherInSeries().then(result => console.log(result));
weather.getWeatherInParallel().then(result => console.log(result));
