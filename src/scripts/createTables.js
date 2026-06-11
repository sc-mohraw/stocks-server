const pool = require('../config/db');

async function createTables() {
    try {

        // User table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // stocks table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS stocks (
                id SERIAL PRIMARY KEY,
                stock_date TIMESTAMPTZ DEFAULT NOW(),
                open NUMERIC(10,2) DEFAULT 0,
                close NUMERIC(10,2) DEFAULT 0,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        console.log('New table created');
    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
}

createTables();