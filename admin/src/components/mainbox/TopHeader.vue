<template>
  <el-header>
    <!-- <button @click="handleCollapsed">click</button>
    header -->
    <div class="left">
      <el-icon  @click="handleCollapsed"><Menu /></el-icon>
      <span style="margin-left: 10px">管理系统</span>
    </div>
    <div class="right">
      <span>欢迎 admin 回来</span>
      <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon :size="20" color="#fff"><user /></el-icon>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
    </el-header>
</template>
<script setup>
import {useStore} from 'vuex'
import {Menu, User} from '@element-plus/icons-vue'
import {useRouter} from "vue-router"

const store = useStore()
const router = useRouter()
const handleCollapsed = ()=> {
  store.commit("changeCollapsed")
}
const handleCenter = ()=> {
  router.push("/center")
}
const handleLogout = ()=> {
  localStorage.removeItem("token")
  router.push("/login")
}
</script>
<style scoped lang="scss">
.el-header{
  background: #263a4b;
  color:#fff;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left, .right{
  display: flex;
}
.left{
  i{
    cursor: pointer;
    margin: auto;
  }
}
.right{
  .el-dropdown{
    i{
    margin: auto;
  }
  }
}

</style>
