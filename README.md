# Overview of the system

- Listens to a simulated sensor data stream (you may use mock data).
- Validates the incoming data based on simple predefined rules (e.g., temperature range, proper format, etc.).
- Sends alerts (can be console logs for this exercise) when the data does not conform to the set rules.
- Logs the incoming data and its validation status.

## Step 1: Setup PostgreSQL database

- Open a terminal or command prompt
- Navigate to the `docker-dev-stack` directory
- Run `docker-compose up` for start PostgreSQL
- If you want to run it in detached mode (in the background), you can use:
  - Run `docker-compose up -d` for start PostgreSQL (Optional)
- To stop and remove the containers run `docker-compose down`

## Step 2: Setup the project dependencies

- Open a terminal or command prompt
- Navigate to the project directory root
- Run `npm install` for install dependencies
  
## Step 3: Run the project

- Open a terminal or command prompt
- Navigate to the project directory root
- Run `node app.js`

## Step 4: Setup the testing tool

- Open project in the `VS Code`
- Install `REST Client` extension
- open `test` folder

## Step 5: Run test

- Open `test-sensor-data-valid-data.http` file and run the test for valid sensor data stream
- Open `test-sensor-data-not-valid-temperature-data.http` file and run the test for in-valid sensor data stream
- Open `test-validation-status.http` file and run the test for get the valid stored sensor data
