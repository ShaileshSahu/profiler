const orderController = require('./order.controller');
const Profiler = require('../../utils/profiler');
function OrderRouter(fastify,options, done) {
    fastify.get('/', async (request, reply) => {
        try {    
            const { page = 1, perPage = 10 } = request.query;
            const profiler = new Profiler("orders");
            profiler.startProfiling();
            // profiler.startProfilingHeap();
            const data = await orderController.getTransactions(fastify,page,perPage);
            profiler.stopProfiling();
            // profiler.stopProfilingHeap();
            return reply.status(200).send(data);
        } catch (err) {
          reply.status(500).send({ error: 'Database error', details: err.message });
        }
    });
    done();
    
}

module.exports = OrderRouter;