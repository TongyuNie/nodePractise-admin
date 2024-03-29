import Home from "@/views/home/Home.vue"
import Center from "@/views/center/Center.vue"
import NotFound from "@/views/notfound/NotFound.vue"
import UserAdd from "@/views/user-manage/UserAdd.vue"
import UserList from "@/views/user-manage/UserList.vue"
import NewsAdd from "@/views/news-manage/NewsAdd.vue"
import NewsList from "@/views/news-manage/NewsList.vue"
import EditNews from "@/views/news-manage/NewsEdit.vue"
import ProductAdd from "@/views/product-manage/ProductAdd.vue"
import ProductList from "@/views/product-manage/ProductList.vue"


const routesConfig = [
  {
    path: "/index",
    component: Home,
  },
  // center--mainbox/center, /center--center
  {
    path: "/center",
    component: Center,
  },
  {
    path: "/user-manage/adduser",
    component: UserAdd,
    requireAdmin: true
  },
  {
    path: "/user-manage/userlist",
    component: UserList,
    requireAdmin: true
  },
  {
    path: "/news-manage/addnews",
    component: NewsAdd,
  },
  {
    path: "/news-manage/newslist",
    component: NewsList,
  },
  {
    path: "/news-manage/editnews/:id",
    component: EditNews,
  },
  {
    path: "/product-manage/addproduct",
    component: ProductAdd,
  },
  {
    path: "/product-manage/productlist",
    component: ProductList,
  },
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
]
export default routesConfig