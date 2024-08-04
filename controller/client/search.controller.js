const Product = require("../../models/product.model.js");
const productsHelper = require('../../helper/product.js');
const systemConfig = require("../../config/system.js");

//[GET] /search
module.exports.index = async (req, res) => {
    const keyword=req.query.keyword;
    if(keyword){
        const keywordRegex=new RegExp(keyword,"i");
        var products = await Product.find({
            title: keywordRegex,
            status: "active",
            deleted: false
        });
    }

    const newProducts = productsHelper.newPriceProducts(products);
    res.render('client/pages/search/index.pug', {
        pageTitle: "Kết quả tìm kiếm",
        keyword: keyword,
        products: newProducts
    })
}