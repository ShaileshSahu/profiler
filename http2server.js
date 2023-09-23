const http2 = require('http2');
const fs= require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 4000;

const server = http2.createSecureServer({
    key:fs.readFileSync(path.join(__dirname,'localhost.key')),
    cert:fs.readFileSync(path.join(__dirname,'localhost.crt'))
});

server.on('stream', (stream, headers) => {
    stream.respond({
        'content-type': 'text/plain',
        ':status':200
    });
    stream.end('Hello, Http/2');
});

server.listen(port,hostname,()=>{
    console.log("Server runnig at ", port);
});