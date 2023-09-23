const fs= require('fs');
const path = require('path');
const fastify = require('fastify')({logger:true, http2:true, https:{
    key:fs.readFileSync(path.join(__dirname,'localhost.key')),
    cert:fs.readFileSync(path.join(__dirname,'localhost.crt'))
}});
const ENV = 3000;
const FileRouter = require('./modules/files/file.route');

fastify.register(FileRouter, {prefix:"/v1/files"})
fastify.listen({port:ENV}, (err)=>{
    if(err){
        console.log("exist",err);
        process.exit(1);
    }
    fastify.log.info("Server running",ENV);
});