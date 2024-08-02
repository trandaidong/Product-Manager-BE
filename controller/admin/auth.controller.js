const Account = require("../../models/account.model.js");
const Role = require("../../models/roles.model.js");
const systemConfig = require("../../config/system.js");
var md5 = require('md5'); // thư viện mã hóa password
const Roles = require("../../models/roles.model.js");

//[GET] /admin/auth/login
module.exports.login = (req, res) => {
    if (req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    }
    else {
        res.render("admin/pages/auth/login.pug", {
            pageTitle: "Đăng nhập"
        })
    }
}
//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;

    const user = await Account.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        req.flash("error", "Email not exists!");
        res.redirect('back');
        return;
    }
    if (md5(password) != user.password) {
        req.flash("error", "Invalid password!");
        res.redirect('back');
        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "Inactive account!");
        res.redirect('back');
        return;
    }
    res.cookie('token', user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

//[GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}