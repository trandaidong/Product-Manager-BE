var mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions:{
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{ // object thứ 2 này chứa thời gian tạo mới sản phẩm => tạo ra 2 trường createAt, updateAt trong database
    timestamps: true
})
const Roles = mongoose.model("Roles", rolesSchema, 'roles');// tham số thứ 3 giống nhưu là tên bảng trong database để nó có thể tìm tới

module.exports = Roles;