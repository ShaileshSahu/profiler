const WebSocket = require('ws');
const fastify = require('fastify')({logger:true});
const fp = require('fastify-plugin');
const ENV = 4000;
const FileRouter = require('./modules/files/file.route');
const OrderRouter = require('./modules/orders/order.route');
const connectMongo = require('./connections/mongodb');
fastify.register(fp(connectMongo));
fastify.register(FileRouter, {prefix:"/v1/files"});
fastify.register(OrderRouter, {prefix:"/v1/orders"});
fastify.get("/", (req,res)=>{
    console.log("mong", fastify.abc);
})


fastify.listen({port:ENV}, (err)=>{
    if(err){
        console.log("exist",err);
        process.exit(1);
    }
    fastify.log.info("Server running",ENV);
})