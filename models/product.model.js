var slug = require('mongoose-slug-updater');
var mongoose = require('mongoose');

mongoose.plugin(slug);// để tự động chuyển tên sản phẩm thành slug(san-pham-1)

const productSchema = new mongoose.Schema({
    title: String,
    parent_category_id:{
        type: String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
    createdBy:{
        account_id: String,
        createAt:{
            type: String,
            default: Date.now
        }
    },
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{ // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const Product = mongoose.model("Product", productSchema, 'products');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = Product;