const express = require('express') // khai báo router
const router = express.Router();// tạo ra router tơ tương tự như app đỡ phải truyền app vô
const controller = require('../../controller/client/product.controller.js');

router.get('/', controller.index)

router.get('/detail/:slugProduct', controller.detail)

router.get('/:slugCategory', controller.category)

module.exports = router;