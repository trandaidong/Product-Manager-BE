// LIBRARY
const express = require('express')
const controller = require('../../controller/admin/accounts.controller');
const router = express.Router();
const multer = require('multer')// thư viện upload ảnh
const upload = multer();
const validate = require("../../validates/admin/accounts.validate.js");


const uploadClound = require("../../middlewares/admin/uploadCloud.middleware.js")
// CONTENT
router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create',
    upload.single('avatar'),
    uploadClound.upload,
    validate.createPost, 
    controller.createPost);

router.get('/update/:id', controller.update);

// router.patch('update/:id',
//     upload.single("avatar"),
//     uploadClound.upload,
//     //validate.updatePost, 
//     controller.updatePost
// )

module.exports = router;