import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres',
});

async function initializeDatabase() {
  try {
    await client.connect();

    // Create database if it doesn't exist
    const dbCheckResult = await client.query(
      `SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1)`,
      [process.env.DB_NAME]
    );

    if (!dbCheckResult.rows[0].exists) {
      console.log(`Creating database ${process.env.DB_NAME}...`);
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log('Database created successfully!');
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists.`);
    }

    await client.end();

    // Connect to the new database
    const appClient = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    });

    await appClient.connect();

    // Read and execute schema
    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf-8'
    );

    await appClient.query(schema);
    console.log('Schema initialized successfully!');

    await appClient.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
