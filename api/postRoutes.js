const express = require('express');

const router = express.Router();

router.use(express.json());

const postData = require('../posts/postDb.js');

const validatePost = (req, res, next) => {
    if (req.body === undefined) {
        res.status(400).json({message: "Missing post data."})
    } else if (req.body.text === undefined || req.body.text.length === 0) {
        res.status(400).json({message: "Missing required text field."})
    } else {
        next();
    }
}

const validatePostId = (req, res, next) => {
    postData.getById(req.params.id)
    .then(response => {
        if (response !== undefined) {
            console.log(req.params.id)
            req.post = response;
            next();
        } else {
            res.status(400).json({message: "Invalid post id."})
        }

    })
}

//GET all posts
router.get('/', (req, res) => {
    postData.get()
    .then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(500).json({messsage: "Failed to get posts."})
    })
})

//POST a new post

router.post('/', validatePost, (req, res) => {
    postData.insert(req.body)
    .then(response => {
        res.status(201).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to add new post."})
    })
})

//GET post by post id
router.get('/:id', validatePostId, (req, res) => {
    postData.getById(req.params.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to get post by id."})
    })
})

//PUT aka update post using post id

router.put('/:id',validatePostId, validatePost, (req, res) => {
    postData.update(req.params.id, req.body)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to update post."})
    })

})

//DELETE post using post id

router.delete('/:id', validatePostId, (req, res) => {
    postData.remove(req.post.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to remove post."})
    })
})


module.exports = router;
