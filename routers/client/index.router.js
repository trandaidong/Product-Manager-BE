const productRouter = require("./product.router.js");
const homeRouter= require("./home.router.js")

// Bên js thì ta chỉ cần sài export nhưng giờ ta sẽ export hết ra các hàm này nên sài
module.exports = (app) => {
    app.use('/', homeRouter);

    app.use('/products', productRouter);
}

