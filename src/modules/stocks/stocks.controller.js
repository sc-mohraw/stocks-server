const stockService =
    require('./stocks.service');

async function getStocks(
    req,
    res,
    next
) {
    try {
        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 30;

        const result =
            await stockService.getStocks(
                page,
                limit
            );

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

async function createStock(
    req,
    res,
    next
) {
    try {
        const result =
            await stockService.createStock(
                req.body
            );

        const io = req.app.get('io');

        io.emit('stock-added');

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

async function getMonthlyAverages(
    req,
    res,
    next
) {
    try {
        const result = await stockService.getMonthlyAverages();

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getStocks,
    createStock,
    getMonthlyAverages
};