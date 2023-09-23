
const config = require('../../config/config');
const {db, collection } = config;
class OrderController {

    async getTransactions(fastify, page,perPage) {
        const Analytics = fastify.mongo.client.db(db.Analytics);
        const transactionsCollection = Analytics.collection(collection.transaction)
        const skip = (page - 1) * 100;
        const transactions = await transactionsCollection
            .find()
            .skip(skip)
            .limit(parseInt(perPage))
            .toArray();
        return transactions;
    }
    
}

module.exports = new OrderController();