const express = require('express') // khai báo router
const router = express.Router();// tạo ra router tơ tương tự như app đỡ phải truyền app vô
const controller = require('../../controller/client/chat.controller.js');
const ChatMiddelware=require("../../middlewares/client/chat.middware.js");

router.get('/:roomChatId',ChatMiddelware.isAccess, controller.index);

module.exports = router;