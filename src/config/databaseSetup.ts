import { sequelize } from "./database";

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}

export default initializeDatabase;