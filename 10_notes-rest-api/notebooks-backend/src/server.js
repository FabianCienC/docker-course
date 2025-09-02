const express = require('express');
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const { notebookRouter } = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use('/api/notebooks', notebookRouter);

const port = process.env.PORT;

app.get('/api/notebooks', (req, res) => {
  res.send('Hello, World from notebooks!');
});


mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Connected mongoDB: Starting server")
  app.listen(port, () => {
    console.log(`Notebooks Server is running on ${port}`);
  });
}).catch(err => {
  console.log("Somehitng wnet wrotn")
  console.log(err)
})