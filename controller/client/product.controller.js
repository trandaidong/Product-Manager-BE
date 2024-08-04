const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-category.model.js");
const productsHelper = require('../../helper/product.js');
const systemConfig = require("../../config/system.js");
const productCategoryHelper = require('../../helper/products-category.js');
//[GET] /products
module.exports.index = async (req, res) => {
    console.log("Loading database by client....")

    const products = await Product.find({
        status: "active",
        deleted: false
    });
    const newProducts = productsHelper.newPriceProducts(products);
    res.render('client/pages/products/index.pug', {
        pageTitle: "Trang thông tin sản phẩm",
        products: newProducts
    })
}

//[GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    const product = await Product.findOne({
        status: "active",
        deleted: false,
        slug: req.params.slugProduct
    });
    if (product.parent_category_id) {
        const category = await ProductCategory.findOne({
            _id: product.parent_category_id,
            status: "active",
            deleted: false
        });
        product.category = category;
    }
    const newProducts = productsHelper.newPriceProduct(product);
    res.render('client/pages/products/detail.pug', {
        pageTitle: product.title,
        product: newProducts
    })
}
//[GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    const category = await ProductCategory.findOne({
        deleted: false,
        status: "active",
        slug: req.params.slugCategory
    })
    if (category) {
        // hàm tìm tất cả danh mục con
        const listSubCategory = await productCategoryHelper.getSubCategory(category.id);
        const listSubCategoryId = listSubCategory.map(item => item.id);

        console.log(listSubCategoryId)
        const products = await Product.find({
            deleted: false,
            status: "active",
            //parent_category_id: category.id
            parent_category_id: { $in: [category.id, ...listSubCategoryId] }
        })

        const newProducts = productsHelper.newPriceProducts(products);
        
        res.render('client/pages/products/index.pug', {
            pageTitle: category.title,
            products: newProducts
        })
    }
    else {
        console.log(systemConfig.prefixAdmin);
        res.redirect(`/`);
    }
}