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