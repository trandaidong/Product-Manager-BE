// LIBRARY
const express = require('express')
const controller = require('../../controller/admin/setting.controller');
const router = express.Router();

const multer = require('multer')// thư viện upload ảnh
const upload = multer();
const validate = require("../../validates/admin/product.validate.js");

const uploadClound = require("../../middlewares/admin/uploadCloud.middleware.js")

// CONTENT
router.get('/general', controller.general);

router.patch('/general',
    upload.single("logo"),
    uploadClound.upload,
    controller.generalPatch)
;
module.exports = router;