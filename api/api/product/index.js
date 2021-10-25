/**
 *  Product endpoints
 */

 const { Router } = require('express');
 const controller = require('./product.controller');
 
 const router = new Router();
 
 // All verbs
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;