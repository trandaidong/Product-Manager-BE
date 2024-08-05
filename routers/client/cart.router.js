const express = require('express') // khai báo router
const router = express.Router();// tạo ra router tơ tương tự như app đỡ phải truyền app vô
const controller = require('../../controller/client/cart.controller.js');

router.get('/', controller.index);

router.post('/add/:productId', controller.addPost);

router.get('/delete/:productId', controller.delete);

router.get('/update/:productId/:quantity', controller.update);

module.exports = router;