const express = require('express');
const router = express.Router();
const createorder = require('./controllers/createorder')

router.get('/order',createorder);


module.exports =router;