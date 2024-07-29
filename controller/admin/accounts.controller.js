const Account = require("../../models/account.model.js");
const Role = require("../../models/roles.model.js");
const systemConfig = require("../../config/system.js");
var md5 = require('md5'); // thư viện mã hóa password
const Roles = require("../../models/roles.model.js");

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const Records = await Account.find(find).select("-password -token"); // chọn những collection loại bỏ thuộc tính password and token
    for (const item of Records) {
        const role=await Role.findOne({
            _id: item.role_id,
            deleted: false
        });
        item.role=role;
    }
    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Trang tài khoản",
        records: Records
    })
}

//[GET] /admin/accounts
module.exports.create = async (req, res) => {
    const roles = await Role.find({ deleted: false });
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Trang tạo tài khoản",
        records: roles
    })
}
//[POST] /admin/accounts
module.exports.createPost = async (req, res) => {
    const emailExists = await Account.findOne({
        email: req.body.email,
        deleted: false
    });
    if (emailExists) {
        req.flash("error", `Email ${req.body.email} exists!`);
        res.redirect("back");
    }
    else {
        req.body.password = md5(req.body.password);
        const account = new Account(req.body);

        await account.save();
        req.flash("success", `Create successfully!`);
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}   