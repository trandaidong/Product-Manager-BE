module.exports.createPost = (req, res, next) => { // next là hàm middlewere
    if (!req.body.title) {
        req.flash("error", "Please enter title!");
        res.redirect("back");
        return;
    }
    next();// nếu đúng thì chuyển qua hàm tiếp theo trong router
}