const express = require('express');

const router = express.Router();
//
//Import DB
//
//
router.use(express.json());
const userData = require("../users/userDb.js");

const validate = (req, res, next) => {
    if ( req.body === undefined ) {
        res.status(400).json({ message: `missing user data` })
    } else if (req.body.name === undefined || req.body.name.length === 0) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next()
    }
}

router.get('/', (req, res) => {
    userData.get()
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

router.post('/', validate, (req, res) => {
    userData.insert(req.body)
    .then(response => {
        res.status(201).json(response)
    }).catch(error => {
        res.status(500).json({error: "Failed to add user."});
    })

})

module.exports = router;
