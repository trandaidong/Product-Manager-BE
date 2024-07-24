module.exports = (query) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ];

    if (query.status) {
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = 'active';
    } else {//status thì trả về undefined
        filterStatus[0].class = 'active';
    }

    return filterStatus;
}