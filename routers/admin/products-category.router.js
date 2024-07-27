// LIBRARY
const express = require('express')
const controller = require('../../controller/admin/product-category.controller');
const router = express.Router();
const multer = require('multer')// thư viện upload ảnh
const upload = multer();
const validate = require("../../validates/admin/product-category.validate.js");

const uploadClound = require("../../middlewares/admin/uploadCloud.middleware.js")

// CONTENT
router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single('thumbnail'),
    uploadClound.upload,
    validate.createCategory,// middlewere: có thể thêm được nhiều middlewere có chức năng check validate và chuyển qua hàm tiếp theo 
    controller.createCategory)


module.exports = router;