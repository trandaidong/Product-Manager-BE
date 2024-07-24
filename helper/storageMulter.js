const multer = require('multer');
module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/'); // thiết lập đường dãn file
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now();
            cb(null, `${uniqueSuffix}-${file.originalname}`); // hàm cb tạo tên và file đó đã được truyền sẵn từ lúc gọi hàm
        }
    })
    return storage;
}