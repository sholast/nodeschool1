const http = require('http');
const {TemplateEngine} = require('./templater');

const server = http.createServer( (req, res) => {
    // if(req.method === 'GET' && req.url === '/nick'){
    //     res.write('Nick info');
    //     res.end();
    //
    //     return;
    // }
    // if(req.url === '/nick/:id'){
    //     res.write('Hey nick');
    //     res.end();
    // }
    const templateData = {
        firstname: 'Ivan',
        lastname: 'Petrenko',
        children: {daughter: 'Olga', son: ['Petr', 'Sergey']},
        address: {city: 'Kyiv', street: 'Ivanova', building: '57'}
    };
    const templateEngine = new TemplateEngine('template.html', templateData);
    templateEngine.getStream().pipe(res);
});

server.listen(3000, 'localhost', () => {
    console.log('Listen server on port 3000');
});
