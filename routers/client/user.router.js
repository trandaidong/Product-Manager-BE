const express = require('express') // khai báo router
const router = express.Router();// tạo ra router tơ tương tự như app đỡ phải truyền app vô
const controller = require('../../controller/client/user.controller');
const validate = require('../../validates/client/user.validate');
const authMiddleware=require("../../middlewares/client/auth.middleware");

router.get('/login', controller.login);

router.post('/login', validate.loginPost, controller.loginPost);

router.get('/register', controller.register);

router.post('/register', validate.registerPost, controller.registerPost);

router.get('/logout', controller.logout);

router.get('/password/forgot', controller.forgotPassword);

router.post('/password/forgot', validate.forgotPasswordPost, controller.forgotPasswordPost);

router.get('/password/otp', controller.otpPassword);

router.post('/password/otp', controller.otpPasswordPost);

router.get('/password/reset', controller.resetPassword);

router.post('/password/reset', validate.resetPasswordPost, controller.resetPasswordPost);

router.get('/info',authMiddleware.requireAuth, controller.info);

module.exports = router;