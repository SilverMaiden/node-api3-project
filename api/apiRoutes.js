const express = require('express');

//Routes

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
