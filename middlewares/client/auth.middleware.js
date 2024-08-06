const User = require('../../models/user.model.js');

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.tokenUser) {
        res.redirect(`/user/login`)
    }
    else {
        const user = await Account.findOne({ token: req.cookies.tokenUser })
        if (!user) {
            res.redirect(`/user/login`)
        }
        else {
            next();
        }
    }
}