const express = require('express')
const controller = require('../../controller/admin/product.controller');
const router = express.Router();
const multer = require('multer')// thư viện upload ảnh

//const storageMulter = require("../../helper/storageMulter.js");
//const upload = multer({ storage: storageMulter() });// thiết lập đường dẫn để thư mục lưu file upload
const upload = multer();
const validate = require("../../validates/admin/product.validate.js");

const uploadClound = require("../../middlewares/admin/uploadCloud.middleware.js")

router.get('/', controller.index)

router.patch('/change-status/:status/:id', controller.changeStatus)
// cú pháp :status và :id là router động có thể thay thành cái khác
// những router động này được lưu trong params syntax [req.params]

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single('thumbnail'),
    uploadClound.upload,
    validate.createPost,// middlewere: có thể thêm được nhiều middlewere có chức năng check validate và chuyển qua hàm tiếp theo 
    controller.createPost)

router.get('/update/:id', controller.updatePost);
router.patch('/update/:id', upload.single('thumbnail'), uploadClound.upload,validate.createPost, controller.updatePostPatch);

router.get('/detail/:id', controller.detail);
module.exports = router;