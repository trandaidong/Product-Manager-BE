const ProductCategory = require("../../models/product-category.model.js");
const systemConfig = require("../../config/system.js");
const tableTreeHelper=require("../../helper/createTree.js")

//[GET] /admin/products-category
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);

    const newRecords = tableTreeHelper.tree(records);

    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Trang danh mục",
        records: newRecords
    })
}

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);

    const newRecords = tableTreeHelper.tree(records);

    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Trang tạo danh mục",
        records: newRecords
    })
}
//[POST] /admin/products-category/create
module.exports.createCategory = async (req, res) => {
    if (req.body.position == "") {
        let count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    // save into database
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

//[GET] /admin/products-category/update/:id
module.exports.update = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const productCategory = await ProductCategory.findOne(find);

        const records = await ProductCategory.find({ deleted: false});
    
        const newRecords = tableTreeHelper.tree(records);

        res.render("admin/pages/products-category/update.pug", {
            pageTitle: "Chỉnh sửa danh mục",
            product: productCategory,
            records: newRecords
        })
    }
    catch (err) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

//[PATCH] /admin/products-category/update/:id
module.exports.updateCategory = async (req, res) => {
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`; // gán thumbnail của file cho body còn tên file đã được xử lí ở upload(router)
    }
    // update database
    console.log(req.body)
    try {
        await ProductCategory.updateOne({ _id: req.params.id }, req.body);
        req.flash("success", `Update successfully!`);
    }
    catch (error) {
        req.flash("error", `Update faild!`);
    }
    res.redirect(`back`);
}
//  [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await ProductCategory.findOne(find);

        res.render(`admin/pages/products-category/detail.pug`, {
            pageTitle: "Chi tiết danh mục",
            product: product
        });
    }
    catch (err) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}
//  [DELETE] /admin/products-category/delete ====================> ERROR
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await ProductCategory.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });// new Date để lấy time hiện tại
    req.flash("success", `Delete successfully`)
    res.redirect("back");
}