const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const productHelper = require('../../helper/product');
const User = require("../../models/user.model");
const md5 = require("md5");
const generateRandomNumberHelper = require("../../helper/generate");
const ForgotPassword = require('../../models/forgot-password.model');
const sendMailHelper = require('../../helper/sendMail');

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login.pug", {
        pageTitle: "Đăng nhập tài khoản",
    })
}
// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req.flash("error", "Email not exists!");
        res.redirect("back");
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
    res.cookie("tokenUser", user.tokenUser);

    // Lưu user_id
    await Cart.updateOne({
        _id: req.cookies.cartId
    },{
        user_id: user.id
    })
    res.redirect("/");
}

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng ký tài khoản",
    })
}
// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const exitsEmail = await User.findOne({
        email: req.body.email
    })
    if (exitsEmail) {
        console.log(exitsEmail)
        req.flash("error", "Email already exists!");
        res.redirect("back");
        return;
    }
    else {
        req.body.password = md5(req.body.password);
        const user = new User(req.body);
        await user.save();
        res.cookie("tokenUser", user.tokenUser);
    }
    res.redirect("/");
}
// [GET] /user/login
module.exports.logout = async (req, res) => {
    res.clearCookie('tokenUser');
    res.redirect("/user/login");
}
// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password.pug", {
        pageTitle: "Lấy lại mật khẩu",
    })
}
// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if (!user) {
        req.flash("error", "Email not exists!");
        res.redirect("back");
        return;
    }
    //B1: Create OTP code
    const objectForgotPassword = {
        email: user.email,
        otp: generateRandomNumberHelper.generateRandomNumber(8),
        expireAt: Date.now()
    }
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    //B2: Send OTP to email of user
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `Mã OTP xác minh lấy lại mật khẩu là <b>${objectForgotPassword.otp}</b>
    Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP`;

    sendMailHelper.sendMail(user.email, subject, html);

    res.redirect(`/user/password/otp?email=${user.email}`);
}
// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    res.render("client/pages/user/otp-password.pug", {
        pageTitle: "Nhập mã OTP",
        email: req.query.email
    })
}
// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    console.log(req.body);
    const result = await ForgotPassword.findOne({
        email: req.body.email,
        otp: req.body.otp
    })
    if (!result) {
        req.flash("error", "Invalid OTP!");
        res.redirect("back");
        return;
    }
    const user = await User.findOne({
        email: result.email
    })
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");
}
// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password.pug", {
        pageTitle: "Đổi mật khẩu",
    })
}
// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    await User.updateOne({
        tokenUser: req.cookies.tokenUser
    },
        {
            password: md5(req.body.password)
        })
    req.flash("success", "Change password successfully!");
    res.redirect("/");
}
// [GET] /user/info
module.exports.info = async (req, res) => {
    res.render("client/pages/user/info.pug", {
        pageTitle: "Thông tin tài khoản",
    })
}