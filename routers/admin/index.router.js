const dashboardRoutes = require('./dashboard.router.js');
const systemConfig = require('../../config/system.js');
const productRouters = require('./product.router.js');
const productCategoryRouter = require('./products-category.router.js')

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);

    app.use(PATH_ADMIN + "/products", productRouters);

    app.use(PATH_ADMIN + '/products-category', productCategoryRouter)
}