const Roles = require("../../models/roles.model.js");
const systemConfig = require("../../config/system.js");

//[GET] /admin/roles
module.exports.index = async (req, res) => {
    const find={
        deleted: false
    }
    const Records=await Roles.find(find);
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Trang nhóm quyền",
        records: Records
    })
}
//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Tạo nhóm quyền",
    })
}
//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    const roles=await Roles(req.body);
    await roles.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

//[GET] /admin/roles/update/:id
module.exports.update = async (req, res) => {
    const Records=await Roles.findOne({_id: req.params.id});
    console.log(Records)
    res.render("admin/pages/roles/update.pug", {
        pageTitle: "Sửa nhóm quyền",
        records: Records
    })
}
//[PATCH] /admin/roles/updatePost/:id
module.exports.updatePost = async (req, res) => {
    try {
        await Roles.updateOne({ _id: req.params.id }, req.body);
        req.flash("success", `Update successfully!`);
    }
    catch (error) {
        req.flash("error", `Update faild!`);
    }
    res.redirect(`back`);
}