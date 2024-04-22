## Project README

### Description
This project focuses on importing a dump file containing employee, department, salary, donation, and rate data into a PostgreSQL database. It also includes the implementation of an API endpoint that calculates rewards for employees who have donated more than $100 to charity.

### Project Structure
- **Node+PostgreSQL**
  - **.env**: Environment variables configuration file.
  - **package.json**: Node.js package configuration file.
  - **src/**
    - **app.ts**: Main application file.
    - **config/**
      - **database.ts**: Database connection configuration file.
      - **databaseSetup.ts**: Database initialization setup.
    - **controllers/**
      - **calcuationController.ts**: Controller for calculating donation rewards.
      - **employeeController.ts**: Controller for importing dump data into the database.
    - **data/**
      - **dump.txt**: Sample dump file containing employee, department, salary, donation, and rate data.
    - **index.ts**: Main entry point of the application.
    - **models/**
      - **department.ts**: Department model definition.
      - **donation.ts**: Donation model definition.
      - **employee.ts**: Employee model definition.
      - **index.ts**: Index file for exporting all models.
      - **rates.ts**: Rate model definition.
      - **salary.ts**: Salary model definition.
    - **routes/**
      - **index.ts**: Defines API routes.
    - **services/**
      - **parseText.ts**: Service for parsing dump file text.

### Setup
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the PostgreSQL database and configure the connection in the `.env` file.
4. Run the database initialization script using `npm run db:init`.
5. Start the application using `npm start`.

### API Endpoints
- **GET /**: Import dump data into the database.
- **GET /calculate-reward**: Calculate rewards for employees who donated more than $100 to charity.

### Usage
1. Import dump data by making a GET request to `http://localhost:3000/`.
2. Calculate rewards by making a GET request to `http://localhost:3000/calculate-reward`.
3. Ensure the dump file is correctly formatted with the specified hierarchy and indentation.

### Dependencies
- Node.js
- Express
- Sequelize
- PostgreSQL
- Postman
