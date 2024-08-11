const express = require('express') // khai báo router
const router = express.Router();// tạo ra router tơ tương tự như app đỡ phải truyền app vô
const controller = require('../../controller/client/users.controller');
const validate = require('../../validates/client/user.validate');
const authMiddleware=require("../../middlewares/client/auth.middleware");

router.get('/not-friend', controller.notFriend);

router.get('/request', controller.request);

router.get('/accept', controller.accept);

module.exports = router;