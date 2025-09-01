const express = require('express');
const mongoose = require("mongoose")
const { noteRouter } = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/api/notes', noteRouter);

const port = process.env.PORT;

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected mongoDB: Starting server")
        app.listen(port, () => {
            console.log(`Notes Server is running on ${port}`);
        });
    })
    .catch(err => {
        console.log("Somehitng wnet wrotn")
        console.log(err)
    })