// app.js

const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the PostgreSQL database
const sequelize = new Sequelize({
    database: 'iiot',
    username: 'iiot-db-admin',
    password: 'ZyBWCdmES859x7',
    host: 'localhost',
    dialect: 'postgres',
});

// Define a SensorData model
const SensorData = sequelize.define('SensorData', {
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    humidity: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sync the model with the database (create the "SensorData" table)
sequelize.sync();

// Endpoint to receive and validate sensor data
app.post('/sensor-data', async (req, res) => {
    const { temperature, humidity } = req.body;

    // Validate the incoming data based on predefined rules
    if (temperature < -20 || temperature > 50 || humidity < 0 || humidity > 100) {
        console.error('Invalid sensor data:', req.body);
        return res.status(400).send('Invalid sensor data');
    }

    try {
        // Store the validated data in the database
        await SensorData.create({ temperature, humidity });

        // Log the incoming data and validation status
        console.log('Incoming Sensor Data:', req.body);
        console.log('Data is valid.');

        res.status(200).send('Data received and validated');
    } catch (error) {
        console.error('Error storing sensor data:', error);
        res.status(500).send('Internal server error');
    }
});

// Endpoint to retrieve the validation status of the last 10 data points
app.get('/validation-status', async (req, res) => {
    try {
        const lastTenData = await SensorData.findAll({
            order: [['timestamp', 'DESC']],
            limit: 10,
        });
        res.status(200).json(lastTenData);
    } catch (error) {
        console.error('Error retrieving validation status:', error);
        res.status(500).send('Internal server error');
    }
});

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

// Start the Express.js server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
