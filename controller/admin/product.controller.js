const Product = require("../../models/product.model.js");
const filterStatusHelper = require("../../helper/filterStatus.js");
const searchHelper = require("../../helper/search.js");
const paginationHelper = require("../../helper/pagination.js");
const systemConfig = require("../../config/system.js")

//[GET] /admin/products
module.exports.index = async (req, res) => {

    console.log("Loading database by admin....");
    // dòng code này có nghĩa là in ra đối tượng status trên thanh url (param)
    //console.log(req.query.status) // nếu không có status thì trả về undefined

    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    }

    var objectsearch = searchHelper(req.query);

    if (objectsearch.keyword) {
        find.title = objectsearch.title;
    }

    if (req.query.status) {
        find.status = req.query.status;
    }

    //pagination
    const countProducts = await Product.countDocuments(find);

    const objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 3
        },
        req.query,
        countProducts
    )

    // sort
    const sorts = {};
    if (req.query.sortKey && req.query.sortValue) {
        sorts[req.query.sortKey] = req.query.sortValue;
    } else {
        sorts.position = "desc"
    }
    // end sort

    const products = await Product.find(find)
        .sort(sorts)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    // tìm giới hạn bao nhiêu sản phẩm và bỏ qua bao nhiết bắt đầu từ đầu
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectsearch.keyword,
        pagination: objectPagination
    })
}
//  [PATCH] /admin/products/change-status/active/123
module.exports.changeStatus = async (req, res) => {
    await Product.updateOne({ _id: req.params.id }, { status: req.params.status })
    // hàm này đối số gồm 2 object: đầu tiên là object để tìm đối tượng đó trong dữ liệu
    //: thứ 2 là đối tượng muốn update
    // params: chứa những router động
    //res.redirect("/admin/products"); // chuyển hướng về router chỉ định
    req.flash("success", "Update successfully")
    res.redirect("back");// quay ve trang hien tai
}
//  [PATCH] /admin/products/changeMulti
module.exports.changeMulti = async (req, res) => {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: type });
            req.flash("success", `Update successfully ${ids.length} products`)
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: type });
            req.flash("success", `Update successfully ${ids.length} products`)
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() });
            req.flash("success", `Delete successfully ${ids.length} products`)
            break;
        case "change-position":
            for (let item of ids) {
                let [id, pos] = item.split("-");
                pos = parseInt(pos);
                await Product.updateOne({ _id: id }, { position: pos });
            }
            req.flash("success", `Update position successfully ${ids.length} products`)
            break;
        default:
            break;
    }

    res.redirect("back");
}
//  [DELETE] /admin/products/delete
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });// new Date để lấy time hiện tại
    req.flash("success", `Delete successfully`)
    res.redirect("back");
}
//  [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Trang san pham",
    })
}
//  [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);

    if (req.body.position == "") {
        let count = await Product.countDocuments();
        req.body.position = count + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }
    // if (req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`; // gán thumbnail của file cho body còn tên file đã được xử lí ở upload(router)
    // }
    // ceate new product
    const product = new Product(req.body);
    // save into database
    await product.save()
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}
//  [GET] /admin/products/update/:id
module.exports.updatePost = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);

        res.render(`admin/pages/products/update.pug`, {
            pageTitle: "Sửa đổi sản phẩm",
            product: product
        });
    }
    catch (err) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
//  [PATCH] /admin/products/update/:id
module.exports.updatePostPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`; // gán thumbnail của file cho body còn tên file đã được xử lí ở upload(router)
    }
    // save into database
    try {
        await Product.updateOne({ _id: req.params.id }, req.body);
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
        const product = await Product.findOne(find);

        res.render(`admin/pages/products/detail.pug`, {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });
    }
    catch (err) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}