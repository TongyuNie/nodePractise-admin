import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
// import Home from "@/views/home/Home.vue"
// import Center from "@/views/center/Center.vue"
import routesConfig from "./config.js";
import store from "@/store/index.js"

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// router.addRoute('mainbox',{
//   path: "/index",
//   component: Home,
// })
// router.addRoute('mainbox',{
//   path: "center",
//   component: Center,
// })

router.beforeEach((to, from, next) => {
  if (to.name === "login") next();
  else {
    // 鉴权
    if (!localStorage.getItem("token")) {
      next({ path: "login" });
    } else {
      if(!store.state.isGetterRouter){
        //  还未配置过路由，这是第一次
        router.removeRoute('mainbox') // 解决管理员-编辑用户列表还能访问bug
        ConfigRouter()
        next({
          path: to.fullPath
        })
      }else{
        next()
      }

     
    }
  }

  // next()
});
const checkPermission =(item)=>{
  if(item.requireAdmin){
    return store.state.userInfo.role === 1
  }
  return true
}

const ConfigRouter = () => {
  if(!router.hasRoute("mainbox")){
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: MainBox,
    })
  }
  routesConfig.forEach((item) => {
    checkPermission(item) && router.addRoute("mainbox", item);
  });
  store.commit("changeGetterRouter", true)
}

export default router;
