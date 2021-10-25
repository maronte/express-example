/**
 *  User
 */

const { Router } = require('express');
const controller = require('./user.controller');
const auth = require('../../auth/auth.service');
const router = Router();

router.post('/', controller.create);
router.get('/', auth.isAuthenticated, controller.index);

module.exports = router;