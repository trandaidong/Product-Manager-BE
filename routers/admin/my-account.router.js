// LIBRARY
const express = require('express')
const controller = require('../../controller/admin/my-account.controller');
const router = express.Router();

const multer = require('multer')// thư viện upload ảnh
const upload = multer();
const validate = require("../../validates/admin/product.validate.js");
const uploadClound = require("../../middlewares/admin/uploadCloud.middleware.js")

// CONTENT
router.get('/', controller.index);

router.get('/update', controller.update);

router.patch('/update', 
    upload.single('avatar'), 
    uploadClound.upload,
    controller.updatePatch);

module.exports = router;