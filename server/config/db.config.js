const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/compony-system")


// 绑定数据库连接成功事件
mongoose.connection.once("open", function () {
  console.log("连接成功");
});
// 绑定数据库连接失败事件
mongoose.connection.once("close", function () {
  console.log("数据库连接已经断开");
});
