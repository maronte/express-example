/**
 * auth routes
 */

const express = require('express');
const auth = require('./auth.controller');
const router = express.Router();

router.use('/login', auth.login);

module.exports = router;