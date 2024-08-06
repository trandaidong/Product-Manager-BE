var mongoose = require('mongoose');
const geneerate=require("../helper/generate.js");

const settingGeneralSchema = new mongoose.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String
})
const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, 'settings-general');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = SettingGeneral;