var express = require('express');
var UserRouter = express.Router();
const UserController  = require('../../controller/admin/UserController')

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
const multer  = require('multer')
// 存储位置
const upload = multer({ dest: 'public/avataruploads/' })

UserRouter.post("/adminapi/user/login", UserController.login)
UserRouter.post("/adminapi/user/upload",upload.single('file'), UserController.upload)
UserRouter.post("/adminapi/user/add", upload.single("file"), UserController.add)
UserRouter.get("/adminapi/user/list", UserController.getList)
UserRouter.get("/adminapi/user/list/:id", UserController.getList)
UserRouter.delete("/adminapi/user/list/:id", UserController.delList)
UserRouter.put("/adminapi/user/list/:_id", UserController.putList)

module.exports = UserRouter;
