const http = require("http");

class WeatherRequester {

    getWeather(city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=181b87b60705ae59e14754992d5f2f48`;

        return new Promise((resolve, reject) => {
            const req =  http.get(url, (res) =>{
                let body ='';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    return resolve(body);
                });
            });

            req.on('error', (e) => {
                return reject(new Error(e));
            });

            req.end();
            return req;
        })
    };

    getWeatherInSeries() {
        let kyivWeather, kharkivWeather;
        return this.getWeather('Kyiv')
            .then(result => {
                kyivWeather = result;
                return this.getWeather('Kharkov');
            })
            .then(result => {
                kharkivWeather = result;
                return {kyivWeather, kharkivWeather};
            })
            .catch(err => console.error(err));
    };

    getWeatherInParallel() {
        return Promise.all([this.getWeather('Kyiv'), this.getWeather('Kharkiv')])
            .then(result => {
                return {
                    kyivWeather: result[0],
                    kharkivWeather: result[1]
                }
            })
            .catch(err => console.error(err));
    }
}

const weather = new WeatherRequester();

weather.getWeatherInSeries().then(result => console.log(result));
weather.getWeatherInParallel().then(result => console.log(result));

module.exports.WeatherRequester = WeatherRequester;
