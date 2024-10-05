// import some dependencies

// express framework for handling http request
const express = require('express');
const mysql = require('mysql2')
const dotenv = require ('dotenv')

const app = express();
dotenv.config()


//creating connection object
const db = mysql.createConnection({
  
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

})


//1. Retrieve all patients

app.get('/get-patients', (req, res) =>{
    const getPatients = "SELECT *FROM PATIENTS"

    db.query(getPatients, (err, results) =>{
        if(err) {
            return res.status(500).send("internal server error")
        }

        console.log("my connection is succeful")
        res.status(200).send(results)

    })
})


// 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";

    db.query(getProviders, (err, results) => {
        res.status(200).json(results);
    });
});

// 3. Filter patients by First Name
app.get('/patients', (req, res) => {
    const firstName = req.query.first_name; // Get first_name from query parameters
    const getPatientsByFirstName = "SELECT * FROM patients WHERE first_name = ?";

    db.query(getPatientsByFirstName, [firstName], (err, results) => {
        res.status(200).json(results);
    });
});

// 4. Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
    const specialty = req.query.specialty; // Get specialty from query parameters
    const getProvidersBySpecialty = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";

    db.query(getProvidersBySpecialty, [specialty], (err, results) => {
        res.status(200).json(results);
    });
});







// check for connection


// start the server
const PORT = 3008;
app.listen(PORT, () => {
    console.log(`server listeing on port ${PORT}`);


    });
     
