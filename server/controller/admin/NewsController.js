const NewsService = require("../../services/admin/NewsServices") 

const NewsController = {
  add: async (req, res) => {
    const {title, content, categrey,isPublish} = req.body
    const cover = req.file? `/newsuploads/${req.file.filename}` : "" //存储位置
    await NewsService.add({
      title, 
      content, 
      categrey:Number(categrey), 
      cover, 
      isPublish:Number(isPublish),
      editTime: new Date()
    })
    res.send({
      ActionType: "OK",
    })
  },
  updateList: async (req, res) => {
    const {title, content, categrey,isPublish, _id} = req.body
    const cover = req.file? `/newsuploads/${req.file.filename}` : "" //存储位置
    await NewsService.updateList({
      title, 
      content, 
      categrey:Number(categrey), 
      cover, 
      isPublish:Number(isPublish),
      editTime: new Date(),
      _id,
    })
    res.send({
      ActionType: "OK",
    })
  },
  getList: async (req, res) => {
    const result = await NewsService.getList({_id: req.params.id})
    res.send({
      ActionType: "OK",
      data: result
    })
  },
  publish: async (req, res) => {
    // console.log("pppublish", req.body)
    await NewsService.publish({
      ...req.body,
      editTime: new Date()
    })
    res.send({
      ActionType: "OK",
    })
  },
  delList: async (req, res) => {
    await NewsService.delList({_id: req.params.id})
    res.send({
      ActionType: "OK",
    })
  },

}
module.exports = NewsController