/**
 *  Hello world endpoints
 */

const { Router } = require('express');
const controller = require('./helloWorld.controller');

const router = new Router();

// All verbs
router.get('/', controller.index);

/**
 * If we had other verbs HTTP
router.delete('/:id', controller.destroy);
router.put('/:id/', controller.update);
router.get('/:id', controller.show);
router.post('/', controller.create);
*/

module.exports = router;