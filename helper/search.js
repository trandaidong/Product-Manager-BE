module.exports=(query)=>{
    const objectsearch = {
        keyword: ""
    };

    if (query.keyword) {
        objectsearch.keyword = query.keyword;

        // tìm kiếm không cần chính xác, khớp là được => sài regex
        const regex = new RegExp(objectsearch.keyword, 'i'); // đối số thứ 2 có nghĩa là khong phân biệt viết hoa viết thường

        objectsearch.title = regex;
    }
    return objectsearch;
}