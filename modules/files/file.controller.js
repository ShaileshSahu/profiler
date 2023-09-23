const fs= require('fs');
const path = require('path');
const readableStream = fs.createReadStream(path.join(__dirname,'../../people.csv'));
fs.readFileSync(path.join(__dirname,'../../people.csv'))
readableStream.setEncoding("binary");
class FileController {
    async readFile(reply) {        
        const data = fs.readFileSync(path.join(__dirname,'../../people.csv'));
        data.toString().replace(',','|');
        return data;
    }
}

module.exports = FileController;