require('dotenv').config();

const { Client } = require('pg');

async function createDatabase() {
    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'postgres', // connect to default db
    });

    try {
        await client.connect();

        const dbName = process.env.DB_NAME;

        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        if (result.rowCount === 0) {
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database '${dbName}' created successfully`);
        } else {
            console.log(`Database '${dbName}' already exists`);
        }
    } catch (error) {
        console.error('Error creating database:', error.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

createDatabase();