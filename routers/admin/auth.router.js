// LIBRARY
const express = require('express')
const controller = require('../../controller/admin/auth.controller');
const router = express.Router();
const validate=require('../../validates/admin/login.validate.js')

// CONTENT
router.get('/login', controller.login);

router.post('/login' ,
    validate.loginPost,
    controller.loginPost);

router.get('/logout', controller.logout);

module.exports = router;