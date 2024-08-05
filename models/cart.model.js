var mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    
    user_id: String,

    products:[
        {
            product_id: String,
            quantity: Number
        }
    ]
},{ // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const Cart = mongoose.model("Cart", cartSchema, 'carts');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = Cart;