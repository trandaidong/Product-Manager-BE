// LIBRARY
const express = require('express')
const controller = require('../../controller/admin/roles.controller');
const router = express.Router();

// CONTENT
router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/update/:id', controller.update);

router.patch('/update/:id', controller.updatePost);

module.exports = router;