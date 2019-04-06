const express = require('express');

const userDb = require('./userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await userDb.find();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'I think something went wrong!',
        });
    }  
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const users = await userDb.getById(id);
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(404).json({
                message: `The post with the specified ${id} does not exist.`
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `User ${id} information was not fetched`
        });
    }
});




module.exports = router;