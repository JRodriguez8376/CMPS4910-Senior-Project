const express = require('express');


const authRouter = require('./auth');
const hotspotRouter = require('./hotspot');
const userRouter = require('./userinfo');

const api = express.Router()
    .use('/auth', authRouter)
    .use('/hotspot', hotspotRouter)
    .use('/user', userRouter);

module.exports = api;