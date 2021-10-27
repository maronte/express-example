/**
 *  User
 */

const { Router } = require('express');
const controller = require('./user.controller');
const auth = require('../../auth/auth.service');
const router = Router();
const validation = require('./user.validations');

router.post('/', validation.validateUserData ,controller.create);
router.get('/', auth.validateJWT, auth.isAdmin, controller.getAll);

module.exports = router;