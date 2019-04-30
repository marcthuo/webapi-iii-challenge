const express = require('express');

const userDb = require('./userDb.js');

const router = express.Router();

//check
router.get('/', async (req, res) => {
    try {
        const user = await userDb.get();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'I think something went wrong!',
        });
    }  
});

//check
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const users = await userDb.getById(id);
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({
                message: `The user with the specified ${id} does not exist.`
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `User ${id} information was not fetched`
        });
    }
});

//check
router.get('/:id/posts', async (req, res) => {
    try {
        const post = await userDb.getUserPosts(req.params.id);
            res.status(200).json(post);
        }
     catch (err) {
         console.log(err);
        res.status(500).json({
            message: 'there was an error'
        });
    }
});

//
router.post('/', async (req, res) => {
    try {
        const user = await userDb.insert(req.body);
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'There was an error adding user'
        });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const dubs = await userDb.update(req.params.id, req.body);
            if (dubs) {
                res.status(200).json(dubs);
            } else {
                res.status(404).json({
                    message: `The user id ${id} doesn't exist`
                })
            }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error has occurred, no updates logged'
        });
    }
});



module.exports = router;