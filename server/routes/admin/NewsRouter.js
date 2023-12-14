var express = require('express');
var NewsRouter = express.Router();
const NewsController  = require('../../controller/admin/NewsController')

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
const multer  = require('multer')
// 存储位置
const upload = multer({ dest: 'public/newsuploads/' })

NewsRouter.post("/adminapi/news/add", upload.single("file"), NewsController.add)
NewsRouter.get("/adminapi/news/list", NewsController.getList)
NewsRouter.post("/adminapi/news/list", upload.single("file"), NewsController.updateList)
NewsRouter.put("/adminapi/news/publish", NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:id", NewsController.delList)
NewsRouter.get("/adminapi/news/list/:id", NewsController.getList)

module.exports = NewsRouter;
