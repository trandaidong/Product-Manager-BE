const ProductCategory = require('../models/product-category.model');

module.exports.getSubCategory = async (parrentId) => {
    const getCategory = async (parrentId) => {
        const subs = await ProductCategory.find({
            status: "active",
            deleted: false,
            parent_id: parrentId
        })
        let allSub = [...subs];

        for (const sub of subs) {
            const childs = await getCategory(sub.id);
            allSub = allSub.concat(childs);
        }
        return allSub;
    }
    return await getCategory(parrentId);
}