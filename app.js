const http = require("http");
const express = require("express");
const render = require("./templater").render;
const app = express();

app.engine('html', render);

app.set('views', './views'); // specify the views directory
app.set('view engine', 'html') ;// register the template engine

app.get('/', function (req, res) {
    const templateData = {
        firstname: 'Ivan',
        lastname: 'Petrenko',
        children: {daughter: 'Olga', son: ['Petr', 'Sergey']},
        address: {city: 'Kyiv', street: 'Ivanova', building: '57'}
    };
    res.render('template', templateData);
});

http.createServer(app).listen(3000);