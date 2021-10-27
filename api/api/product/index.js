/**
 *  Product endpoints
 */

 const { Router } = require('express');
 const controller = require('./product.controller');
 const validator = require('./product.validations');

 const router = new Router();
 
 // All verbs
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validator.validateProductData, controller.create);
router.put('/:id', validator.validateProductData, controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;