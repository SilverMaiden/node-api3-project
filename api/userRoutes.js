const express = require('express');

const router = express.Router();
//
//Import DB
//
//
router.use(express.json());
const userData = require("../users/userDb.js");

const validateUser = (req, res, next) => {
    if (req.body === undefined) {
        res.status(400).json({ message: `missing user data` })
    } else if (req.body.name === undefined || req.body.name.length === 0) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next()
    }
}

const validateUserId = (req, res, next) => {
    userData.getById(req.params.id)
    .then(response => {
        if (response !== undefined) {
            req.user = response;
            next()
        } else {
            res.status(400).json({message: "invalid user id"})
        }
    })
}

router.get('/', (req, res) => {
    userData.get()
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})


router.post('/', validateUser, (req, res) => {
    userData.insert(req.body)
    .then(response => {
        res.status(201).json(response)
    }).catch(error => {
        res.status(500).json({error: "Failed to add user."});
    })

})
// BY ID
//

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
})

//Get posts for specific user using user id

router.get('/:id/posts', validateUserId, (req, res) => {
    userData.getUserPosts(req.user.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: `Failed to get posts for user id ${req.user.id}`})
    })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
    userData.update(req.user.id, req.body)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to update user"})
    })
})

router.delete('/:id', validateUserId, (req, res) => {
    userData.remove(req.user.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to remove user."})
    })
})

module.exports = router;
