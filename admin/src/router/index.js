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
const ConfigRouter = () => {
  routesConfig.forEach((item) => {
    router.addRoute("mainbox", item);
  });
  store.commit("changeGetterRouter", true)
}
// ConfigRouter ()
export default router;
