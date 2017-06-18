const fs = require('fs');
const Transform = require('stream').Transform;

class TemplateTransformer extends Transform {
    constructor(options) {
        super(options);
        this.templateData = options.templateData;
    }

    _transform (chunk, enc, cb) {
        chunk = this.replaceTemplate(chunk.toString());
        this.push(chunk, 'utf8');
        cb();
    };

    replaceTemplate(template) {
        return template.replace(/{{\s*[\w\.]+\s*}}/g, (match =>{
            let clear = (match.substr(2, match.length -4));
            return this.findInTemplateData(clear);
        }));
    }

    findInTemplateData(placeholder){
        let data = placeholder.split('.');
        if(data.length === 1) {
            return this.templateData[data[0]];
        } else {
            return placeholder.split('.').reduce((o,i)=>o[i], this.templateData);
        }
    }


}

const tt = new TemplateTransformer({templateData:  {
    some: ['111some111', 'asdsd'],
    other: '222other222',
    another: '333another333',
    complex: {
        comp1: '4444',
        comp2: '555',
        comp3: '6666'
    }
}});

let readFileStream = fs.createReadStream('template.html');

let writeFileStream = fs.createWriteStream('ready.html');

readFileStream.pipe(tt).pipe(writeFileStream);



