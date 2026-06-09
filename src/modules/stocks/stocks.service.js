const stockModel = require('./stocks.model');

async function getStocks(page, limit) {
    const stocks =
        await stockModel.getStocks(
            page,
            limit
        );

    const total =
        await stockModel.getTotalCount();

    return {
        stocks,
        total,
        page,
        limit,
        totalPages: Math.ceil(
            total / limit
        )
    };
}

async function createStock(data) {
    const {
        open,
        close
    } = data;

    return await stockModel.createStock(
        open,
        close
    );
}

module.exports = {
    getStocks,
    createStock
};