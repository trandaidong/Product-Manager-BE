const Product = require("../../models/product.model.js");

//[GET] /products
module.exports.index = async (req, res) => {
    console.log("Loading database by client....")

    const products = await Product.find({
        status: "active",
        deleted: false
    });

    const newProducts = products.map(item => {
        item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
        return item;
    })
    res.render('client/pages/products/index.pug', {
        pageTitle: "Trang thông tin sản phẩm",
        products: newProducts
    })
}

//[GET] /products/:slug
module.exports.detail = async (req, res) => {
    const product = await Product.findOne({
        status: "active",
        deleted: false,
        slug: req.params.slug
    });
    res.render('client/pages/products/detail.pug', {
        pageTitle: product.title,
        product: product
    })
}