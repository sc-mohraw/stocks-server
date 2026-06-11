const pool = require('../../config/db');

async function getStocks(page, limit) {
    const offset = (page - 1) * limit;

    const result = await pool.query(
        `
        SELECT
            *
        FROM stocks
        ORDER BY stock_date DESC
        LIMIT $1
        OFFSET $2
        `,
        [limit, offset]
    );

    return result.rows;
}

async function getTotalCount() {
    const result = await pool.query(
        `
        SELECT COUNT(*)::INTEGER AS count
        FROM stocks
        `
    );

    return result.rows[0].count;
}

async function createStock(open, close) {

    const result = await pool.query(
        `
        INSERT INTO stocks
        (
            open,
            close
        )
        VALUES ($1, $2)
        RETURNING *
        `,
        [
            open,
            close
        ]
    );

    return result.rows[0];
}

async function getMonthlyAverages() {
    const result = await pool.query(
        `
        SELECT
        DATE_TRUNC('month', stock_date) AS month,
        ROUND(AVG(close), 2) AS avg_close_price
        FROM stocks
        GROUP BY DATE_TRUNC('month', stock_date)
        ORDER BY DATE_TRUNC('month', stock_date);  
        `
    );

    return result.rows;
}

module.exports = {
    getStocks,
    getTotalCount,
    createStock,
    getMonthlyAverages
};