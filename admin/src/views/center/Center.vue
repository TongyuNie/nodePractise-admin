<template>
  <div>
    <el-page-header :icon="null" title="门户管理系统">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
    </el-page-header>
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-card class="box-card1">
          <el-avatar :size="80" :src="avatarURL" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h3>{{ store.state.userInfo.role === 1 ? "管理员" : "编辑" }}</h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userForm.gender"
                class="m-2"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <!-- <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleChange"
              >
                <img v-if="userForm.avatar" 
                :src="uploadAvatar"
                @changeU="handleChange"
                class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload> -->
              <Uploadd :avatar="userForm.avatar"  @changeU="handleChange"></Uploadd>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, ref, resolveDirective } from "vue";
import axios from "axios"
import { ElMessage } from 'element-plus'
import upload from "@/util/upload.js"
import Uploadd from "@/components/upload/Upload.vue"

const store = useStore();
const {username, introduction, gender, avatar} = store.state.userInfo

console.log("center-store", store.state)
const avatarURL = computed(() => {
  return store.state.userInfo.avatar
    ? "http://localhost:3000"+store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});
// const uploadAvatar = computed(() => {
//   const res = userForm.avatar.includes("blob")? userForm.avatar: 
//   "http://localhost:3000"+userForm.avatar 
//   return res
// })
const userFormRef = ref();
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});
const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
const options = [
  { label: "保密", value: 0 },
  { label: "男", value: 1 },
  { label: "女", value: 2 },
];
const handleChange = (file) => {
console.log("文件改变；", file, URL.createObjectURL(file))
userForm.avatar = URL.createObjectURL(file) //本地回显
userForm.file = file  //提交给后端
}
const submitForm = ()=>{
  userFormRef.value.validate(async (valid)=>{
    if(valid){
      console.log("submit", userForm)
      const res = await upload("/adminapi/user/upload", userForm)
        if(res.ActionType === "OK"){
          store.commit("changeUserInfo", res.data)
          ElMessage({
            message: '用户信息修改成功',
            type: 'success',
          })
        }
      

    }
  })
}
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;
  .box-card1 {
    text-align: center;
  }
}
</style>