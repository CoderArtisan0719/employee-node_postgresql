import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

const databaseUrl = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(databaseUrl);

// Function to check the database connection
const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  }
};

export { sequelize, checkDatabaseConnection };
