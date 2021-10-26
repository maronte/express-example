/**
 *  User
 */

const { Router } = require('express');
const controller = require('./user.controller');
//const auth = require('../../auth/auth.service');
const router = Router();

router.post('/', controller.create);
router.get('/', controller.getAll);

module.exports = router;