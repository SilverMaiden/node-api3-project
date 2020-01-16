// code away!

const express = require('express');

const server = express();

const port = 5000;

const userData = require("./users/userDb.js");

const logger = (req, res, next) => {
    console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} `
  );

  next();

}

server.use(logger);


server.get('/api/users', (req, res) => {
    userData.get()
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})


server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})

