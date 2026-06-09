require('dotenv').config();

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const pool = require('../config/db');

const records = [];

async function importCsv() {
    try {
        const csvPath = path.join(
            __dirname,
            '../../csv/Sensex_CSV_2018 - CSVForDate.csv'
        );

        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                records.push({
                    date: row.Date,
                    open: Number(row.Open),
                    close: Number(row.Close),
                });
            })
            .on('end', async () => {
                console.log(`Found ${records.length} records`);

                records.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );

                for (const record of records) {
                    await pool.query(
                        `
                        INSERT INTO stocks
                        (stock_date, open, close)
                        VALUES ($1, $2, $3)
                        `,
                        [
                            record.date,
                            record.open,
                            record.close,
                        ]
                    );
                }

                console.log('CSV imported successfully');

                process.exit(0);
            });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

importCsv();