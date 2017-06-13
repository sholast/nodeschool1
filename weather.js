
const requestPromise = require('request-promise');
const KYIV_URL = 'http://samples.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=181b87b60705ae59e14754992d5f2f48';
const KHARKIV_URL = 'http://samples.openweathermap.org/data/2.5/forecast?q=Kharkiv&appid=181b87b60705ae59e14754992d5f2f48';



class WeatherRequester {
    constructor(){
        this.kharkivWeather = null;
        this.kyivWeather = null;
    }

    getWeatherInSeries() {

    }

    getWeatherInParallel() {

    }


}