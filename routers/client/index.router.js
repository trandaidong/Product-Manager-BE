const searchtRouter = require("./search.router.js");
const productRouter = require("./product.router.js");
const homeRouter = require("./home.router.js")
const cartRouter = require("./cart.router.js")
const categoryMiddleware = require("../../middlewares/client/category.middleware.js");
const cartMiddleware = require("../../middlewares/client/cart.middleware.js");
const chekcoutRouter=require("../../routers/client/checkout.router.js");

// Bên js thì ta chỉ cần sài export nhưng giờ ta sẽ export hết ra các hàm này nên sài
module.exports = (app) => {
    app.use(categoryMiddleware.category)// khi mà sử dụng app.use ở đằng sau thì nó luôn chạy vào middleware này

    app.use(cartMiddleware.cartId);

    app.use('/', homeRouter);

    app.use('/products', productRouter);

    app.use('/search', searchtRouter);

    app.use('/cart', cartRouter);

    app.use('/checkout', chekcoutRouter);
}

