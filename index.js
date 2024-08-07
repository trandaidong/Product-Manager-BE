const express = require('express')// giống include thư viện trong c++
var path = require('path'); // có sẫn trong expressJS
const routerClient = require('./routers/client/index.router.js');
const routerAdmin = require('./routers/admin/index.router.js');
const database = require('./config/database.js')
const systemConfig = require('./config/system.js')
const moment = require('moment'); // thư viện chuyển đổi time timestamp-> time
const methodOverride = require('method-override')// thư viện ghi đè method các phương thức PATH..
const bodyParser = require('body-parser')// thư viện chuyển đổi data trong req.body có thể usable

const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')


require('dotenv').config()

database.connect();

const app = express() // gọi hàm đẻ tạo ra app express
const port = process.env.PORT // khởi tạo port đầu vào

app.use(methodOverride('_method')) // override
app.use(bodyParser.urlencoded({ extended: false }))// encode chuyển đổi res.body => dữ liệu

// __dirname có tác dụng khi deploy code lên server nó có tác dụng như cái folder tổng 
// để tìm đến các folder khác nếu chạy ở local thì nố vẫn có tác dụng như vậy
//app.set('views', `${__dirname}/public`);
app.set('views', `${__dirname}/views`);
app.set("view engine", 'pug');

// SocketIO
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
global._io = io;
// End socketIO

// Flash
app.use(cookieParser('123456789_ABC'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End flash

// tạo biến prefĩAdmin có thể gọi ở tất cả các file pug của chương trình
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
app.use(express.static(`${__dirname}/public`));
//app.use(express.static(`public`));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


routerClient(app);
routerAdmin(app);

// Tất cả những trường hợp khi người dùng truy cập mà không có router thì chạy vào đây
app.get("*", (req, res) => {
  res.render("client/pages/errors/404.pug", {
    pageTitle: "404 NOT FOUND"
  })
})
// mix server vs app
server.listen(port, () => { // lắng nghe port => chạy vô hàm
  console.log(`Example app listening on port ${port}`);
})