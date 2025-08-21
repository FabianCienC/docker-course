const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const users = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  const userId = req.body.userId;
  
  if (!userId) {
    return res.status(400).send('Missing userId');
  }
  
  if (users.includes(userId)) {
    return res.status(409).send('User already exists.');
  }

  users.push(userId);
  return res.status(201).send('User registered.');
});

app.get('/users', (req, res) => {
    return res.json({ users })
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});