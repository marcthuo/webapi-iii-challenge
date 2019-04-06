const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postRouter = require('./data/helpers/post-router.js');
const userRouter = require('./data/helpers/user-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);
// server.use(single('kelly'));

server.get('/',  (req,res) => {
    res.send('API is up and running....')
})

// function single(name) {
//     return function(req, res, next) {
//         const userName = req.header.name || '';
//         if(userName.toUpperCase()=== name.toUpperCase()) {
//             next()
//         } else {
//             res.status(401).json({ message: 'Access Denied!'})
//         }
//     }
// }

module.exports = server;
