const fs = require('fs');
const Transform = require('stream').Transform;


// Transfomer stream
class TemplateTransformer extends Transform {
    constructor(options) {
        super(options);
        this.templateData = options.templateData;
    }

    _transform(chunk, enc, cb) {
        chunk = this.replaceTemplate(chunk.toString());
        this.push(chunk, 'utf8');
        cb();
    };

    replaceTemplate(template) {
        return template.replace(/{{\s*[\w\.]+\s*}}/g, (match => {
            let clear = (match.substr(2, match.length - 4));
            return this.findInTemplateData(clear);
        }));
    }

    findInTemplateData(placeholder) {
        let data = placeholder.split('.');
        if (data.length === 1) {
            return this.templateData[data[0]];
        } else {
            return placeholder.split('.').reduce((o, i) => o[i], this.templateData);
        }
    }
}

// Wrapper, that returns stream
class TemplateEngine {
    constructor(template, templateData) {
        this.readFileStream = fs.createReadStream(template);
        this.templateTransformer = new TemplateTransformer({
            templateData: templateData
        });
    }

    getStream() {
        return this.readFileStream.pipe(this.templateTransformer);
    }
}

//Renderer for Express
class Render {
    constructor() {
    }

    render(filePath, options, callback) {

        let render = new TemplateEngine(filePath, options).getStream();
        let rendered = '';
        render.on('data', (data) => {
            rendered += data;
        });
        render.on('end', () => {
            return callback(null, rendered);
        });
    }
}

module.exports.TemplateEngine = TemplateEngine;
module.exports.TemplateTransformer = TemplateTransformer;
module.exports.render = (new Render).render;
