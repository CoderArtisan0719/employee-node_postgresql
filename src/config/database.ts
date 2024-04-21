import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

// Function to check the database connection
const checkDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  } finally {
    pool.end();
  }
};

export { pool, checkDatabaseConnection };