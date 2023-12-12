const UserServices = require("../../services/admin/UserServices")
const JWT = require("../../util/JWT")

const UserController = {
  login: async (req, res)=> {
    console.log("reqqqq", req.body)
   var result = await UserServices.login(req.body)
    if(result.length === 0){
      res.send({
        code:"-1",
        error: "用户名密码不匹配"
      })
    }else{
      // 生成token并设置在header里
      const token = JWT.generator({
        _id:result[0]._id,
        username: result[0].username
      }, "1d")
      res.header("Authorization", token)
      res.send({
        ActionType: "OK",
        data:{
          username:result[0].username,
          gender:result[0].gender? result[0].gender: 0, //0保密
          introduction:result[0].introduction,
          avatar:result[0].avatar, //头像
          role:result[0].role,
        }
      })
    }
  },
  upload: async (req, res) => {
    console.log("upload后端数据", req.body, req.file)
    const {username, introduction, gender} = req.body
    const avatar = req.file? `/avataruploads/${req.file.filename}` :
    "" //存储位置
    const token = req.headers["authorization"].split(" ")[1]
    var payload = JWT.verify(token)
    await UserServices.upload({_id: payload._id, username, introduction, gender:Number(gender), avatar})
    if(avatar){
      res.send({
      ActionType: "OK",
      data: {
        username, introduction, gender:Number(gender), avatar
      }
    })
    }else{
      res.send({
        ActionType: "OK",
        data: {
          username, introduction, gender:Number(gender)
        }
      })
    }
  },
  add: async (req, res) => {
    console.log("upload后端数据", req.body, req.file)
    const {username, introduction, gender, role, password} = req.body
    const avatar = req.file? `/avataruploads/${req.file.filename}` : "" //存储位置
    await UserServices.add({username, introduction, gender:Number(gender), avatar,
    role: Number(role), password})
    res.send({
      ActionType: "OK",
      data: {
        username, introduction, gender:Number(gender), avatar, role
      }
    })
  },
  getList: async(req, res)=> {
    const result = await UserServices.getList(req.params)
    res.send({
      ActionType: "OK",
      data: result
    })
  },
  delList: async(req, res) => {
    const result = await UserServices.delList({_id: req.params.id})
    res.send({
      ActionType: "OK"
    })
  },
  putList: async (req, res) => {
    const result = await UserServices.putList(req.body)
    res.send({
      ActionType: "OK"
    })
  }
}
 
module.exports = UserController