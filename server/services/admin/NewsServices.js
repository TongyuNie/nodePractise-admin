const NewsModel = require("../../models/NewsModel")

const NewsService = {
  add: async ({title, content, categrey, cover, isPublish, editTime}) => {
    return NewsModel.create({
      title, content, categrey, cover, isPublish, editTime
    })
  },
  updateList: async ({title, content, categrey, cover, isPublish, editTime, _id}) => {
    if(cover){
      return NewsModel.updateOne({_id}, {title, content, categrey, cover, isPublish, editTime})
    }else{
      return NewsModel.updateOne({_id}, {title, content, categrey, isPublish, editTime})
    }
  },
  getList: async ({_id}) => {
    return _id?  NewsModel.find({_id}):NewsModel.find({})
  },
  publish: async ({_id, isPublish, editTime}) => {
    return NewsModel.updateOne({_id}, {isPublish, editTime})
  },
  delList: async ({_id}) => {
    return NewsModel.deleteOne({_id})
  }
}
module.exports = NewsService