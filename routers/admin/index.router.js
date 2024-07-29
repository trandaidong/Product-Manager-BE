const dashboardRoutes = require('./dashboard.router.js');
const systemConfig = require('../../config/system.js');
const productRouters = require('./product.router.js');
const productCategoryRouter = require('./products-category.router.js');
const rolesRouter = require('../../routers/admin/roles.router.js');
const accountsRouter = require('../../routers/admin/accounts.router.js');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);

    app.use(PATH_ADMIN + "/products", productRouters);

    app.use(PATH_ADMIN + '/products-category', productCategoryRouter);

    app.use(PATH_ADMIN + '/roles', rolesRouter);

    app.use(PATH_ADMIN + '/accounts', accountsRouter);
}