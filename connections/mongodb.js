
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sahushailesh9:a8hmLt9wRnrSslln@cluster0.rvrutlf.mongodb.net/?retryWrites=true&w=majority";


async function mongoDBConnector(fastify, options) {
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
    });
    await client.connect().catch(error => {console.log("Error in mongodb connectivity", error);process.exit(1)});
    const db = client.db();
    fastify.log.info("Db connected");
    fastify.decorate('mongo', { client,db});

    fastify.addHook("onClose", (fastifyInstance,done)=>{
        fastifyInstance.mongo.client.close();
        done();
    });
}


module.exports= mongoDBConnector;