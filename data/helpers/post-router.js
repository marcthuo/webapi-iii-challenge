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


router.post('/', async (req, res) => {
    const {text, user_id} = req.body;
    try {
        const post = await postDb.insert(text, user_id);
        res.status(201).json(post)
    } catch (err) {
        console.log(err);
        if (error.errno === 19) {
            message = "please provide both the text and user_id";
          }
        res.status(500).json({
            message: ' There was an error adding post'
        });
    }
});

router.put('/', async (req, res) => {
    const {id} = req.params;
    const updateNew = req.body;
    try {
        const hub = await postDb.update(id, updateNew)
    } catch (err) {
        res.status(500).json({ 
        message: 'An error has occurred, no updates were logged'
        });
    }
});

module.exports = router;