const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const productHelper = require('../../helper/product');

// [GET] /cart/index
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

    res.render("client/pages/cart/index.pug", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    })
}
// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({ _id: cartId });

    const existProductInCart = cart.products.find(item => item.product_id == productId);
    if (existProductInCart) {
        const newQuantity = existProductInCart.quantity + quantity;
        await Cart.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                'products.$.quantity': newQuantity
            }
        );
    }
    else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }
        await Cart.updateOne({ _id: cartId }, { $push: { products: objectCart } });
    }
    req.flash("success", "Add product into cart successfully!");

    res.redirect("back");
}
// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne(
        {
            _id: cartId
        },
        {
            "$pull": { products: { "product_id": productId } } // pop 
        }
    );
    req.flash("success", "Delete product form cart successfully!");

    res.redirect("back");
}
// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity=req.params.quantity;

    await Cart.updateOne(
        {
            _id: cartId,
            'products.product_id': productId
        },
        {
            'products.$.quantity': quantity
        }
    );

    req.flash("success", "Update product form cart successfully!");

    res.redirect("back");
}