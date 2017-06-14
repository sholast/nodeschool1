const server = require('http').createServer();
const WeatherRequester = require('./weather');

server.on('request', (req, res) => {

    let weather = new WeatherRequester();
    weather.getWeatherInParallel()
        .then(data => {
            console.log(data);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(data));
            res.end();
        })
        .catch(e => {
            res.writeHead(500, {'Content-Type': 'plain/text'});
            console.error(e);
            res.write('Sorry');
            res.end();
        })
});

server.on('close', () => {
    console.log('closed');
});

server.listen(3000);
