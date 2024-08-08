const uploadToCloudinary = require("../../helper/uploadToCloundinary");

module.exports.upload = async (req, res, next) => {
    if (req.file) {
        req.body[req.file.fieldname] = await uploadToCloudinary(req.file.buffer);
    }
    next();
}