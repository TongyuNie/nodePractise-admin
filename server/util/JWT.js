const jsonwebtoken = require("jsonwebtoken")
// 创建、解密使用的秘钥
const secret = "kerwin"
const JWT = {
  generator(value,expires){
    return jsonwebtoken.sign(value, secret, {expiresIn:expires})
  },
  verify(token){
    try{
      return jsonwebtoken.verify(token, secret)
    }catch(e){
      return false
    }
    
  }
}
// const token = JWT.generator({name: "kerwin"}, "10s")
// console.log("1111",JWT.verify(token))
// setTimeout(()=>{console.log("2222",JWT.verify(token))}, 11000)
module.exports = JWT