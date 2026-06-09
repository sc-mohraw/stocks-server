const express = require('express');

const stocksRoute = express.Router();

const stocksController =
    require('./stocks.controller.js');


stocksRoute.get(
    '/all',
    stocksController.getStocks
);

stocksRoute.post(
    '/create',
    stocksController.createStock
);

module.exports = stocksRoute;