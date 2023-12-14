const mongoose = require("mongoose")
const Schema = mongoose.Schema
// user模型===》users集合

const NewsType = {
  title:String,
  content:String,
  categrey:Number,  //1最新动态, 2典型案例, 3通知公告
  cover:String,
  isPublish:Number, //0未发布, 1已发布
  editTime: Date,
}
const NewsModel = mongoose.model("news", new Schema(NewsType))
module.exports = NewsModel