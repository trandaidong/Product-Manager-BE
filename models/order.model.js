var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    //user_id: String,
    cart_id: String,
    userInfo:{
        fullname: String,
        phone: String,
        address: String
    },
    products:[
        {
            product_id: String,
            price: Number,
            discountPercentage: Number,
            quantity: Number
        }
    ]
},{ // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const Order = mongoose.model("Order", orderSchema, 'orders');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = Order;