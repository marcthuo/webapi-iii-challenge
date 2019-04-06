const express = require('express');

const postDb = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const post = await postDb.find();
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    } 
});

module.exports = router;