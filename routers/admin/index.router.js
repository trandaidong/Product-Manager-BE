const dashboardRoutes = require('./dashboard.router.js');
const systemConfig = require('../../config/system.js');
const productRouters = require('./product.router.js');
const productCategoryRouter = require('./products-category.router.js');
const rolesRouter = require('../../routers/admin/roles.router.js');
const accountsRouter = require('../../routers/admin/accounts.router.js');
const authRouter = require('../../routers/admin/auth.router.js');
const authMiddleware = require('../../middlewares/admin/auth.middleware.js');
const mAccountRouter = require('../../routers/admin/my-account.router.js');
const settingRouter = require('../../routers/admin/setting.router.js');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', authMiddleware.requireAuth, dashboardRoutes);

    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRouters);

    app.use(PATH_ADMIN + '/products-category', authMiddleware.requireAuth, productCategoryRouter);

    app.use(PATH_ADMIN + '/roles', authMiddleware.requireAuth, rolesRouter);

    app.use(PATH_ADMIN + '/accounts', authMiddleware.requireAuth, accountsRouter);

    app.use(PATH_ADMIN + "/auth", authRouter);

    app.use(PATH_ADMIN + '/my-account', authMiddleware.requireAuth, mAccountRouter)

    app.use(PATH_ADMIN + '/settings', authMiddleware.requireAuth, settingRouter)
}