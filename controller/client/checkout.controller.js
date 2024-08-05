const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const Order = require("../../models/order.model");
const productHelper = require('../../helper/product');

// [GET] /checkout/index
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({ _id: req.cookies.cartId });
    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id;

            var productInfo = await Product.findOne({ _id: productId });
            productInfo = productHelper.newPriceProduct(productInfo);
            item.productInfo = productInfo;
            item.totalPrice = item.quantity * productInfo.newPrice;
        }
    }
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);

    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    })
}

// [POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    const cart = await Cart.findOne({
        _id: cartId
    })
    let products = [];
    for (const product of cart.products) {
        const objectProduct = {
            product_id: product.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: product.quantity
        };
        const productInfo = await Product.findOne({
            _id: product.product_id
        });
        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objectProduct);
    }

    const objectOrder = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }

    const order = new Order(objectOrder);
    await order.save();

    await Cart.updateOne({
        _id: cartId,
    }, {
        products: []
    });

    for (const product of products) {
        const temp = await Product.findOne({
            _id: product.product_id,
        })
        await Product.updateOne(
            {
                _id: product.product_id,
            },
            {
                'stock': temp.stock - product.quantity
            }
        )
    }

    res.redirect(`/checkout/success/${order.id}`);
}