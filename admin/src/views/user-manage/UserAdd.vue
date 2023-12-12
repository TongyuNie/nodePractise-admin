<template>
  <div>
    <el-page-header :icon="null" title="门户管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加用户 </span>
      </template>
    </el-page-header>
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <!-- <el-input v-model="userForm.role" /> -->
        <el-select v-model="userForm.role" class="m-2" style="width: 100%">
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
        <Uploadd :avatar="userForm.avatar" @changeU="handleChange"></Uploadd>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script setup>
import { ref, reactive } from "vue";
import upload from "@/util/upload.js";
import Uploadd from "@/components/upload/Upload.vue";
import {useRouter} from "vue-router"

const userFormRef = ref();
const router = useRouter()
const userForm = reactive({
  username: "",
  password: "",
  role: 2, //1管理员2编辑
  introduction: "",
  avatar: "",
  file: null,
  gender: 0,
});
const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
const options = [
  { label: "管理员", value: 1 },
  { label: "编辑", value: 2 },
];


const handleChange = (file) => {
  console.log("文件改变；", file, URL.createObjectURL(file));
  userForm.avatar = URL.createObjectURL(file); //本地回显
  userForm.file = file; //提交给后端
};
const submitForm = ()=>{
  userFormRef.value.validate(async (valid)=>{
    if(valid){
      console.log("submit", userForm)
      await upload("/adminapi/user/add", userForm)
      router.push("/user-manage/userlist")
    }
  })
}
</script>


<style scoped lang="scss">
.demo-ruleForm {
  margin-top: 40px;
}
</style>
