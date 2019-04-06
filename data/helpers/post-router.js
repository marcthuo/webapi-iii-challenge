const express = require('express');

const postDb = require('./postDb.js');

const router = express.Router();

//check
router.get('/', async (req, res) => {
    try {
        const post = await postDb.get();
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    } 
});

//check
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const posts = await postDb.getById(id);
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({
                message: `The post with the specified ${id} could not be retrieved` 
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Post ${id} information was not received.` 
        });
    }
});







module.exports = router;