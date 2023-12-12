<template>
  <div>
    <!-- login
    <button @click="handloLogin">login</button> -->
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
    />
    <div class="formContainer">
      <h3>ces</h3>
      <el-form
        ref="loginRef"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="loginform"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { loadFull } from "tsparticles";
import { reactive, ref } from 'vue'
import {useRouter} from 'vue-router'
import axios from "axios"
import { ElMessage } from 'element-plus'
import {useStore} from 'vuex'
// import type { FormInstance, FormRules } from 'element-plus'

const store = useStore()
const particlesInit = async (engine) => {
  //await loadFull(engine);
  await loadFull(engine);
};
const loginForm = reactive({
  username: "",
  password: ""
}) //表单绑定响应式对象
const loginRef = ref() //表单引用对象
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
}
const router = useRouter()
const submitForm = () => {
  console.log("1222")
  loginRef.value.validate(valid => {
    console.log("vvvv",valid)
    if(valid){
      axios.post("/adminapi/user/login", loginForm).then(res =>{
        console.log("登录返回信息",res.data)
        if(res.data.ActionType == 'OK'){
          store.commit("changeUserInfo",res.data.data )
          store.commit("changeGetterRouter", false)
          router.push("/index")
        }else{
          ElMessage.error('用户名密码不匹配')
        }
      })
      // router.push("/index")
    }
  })
  // if () return
  // formEl.validate((valid) => {
  //   if (valid) {
  //     console.log('submit!')
  //   } else {
  //     console.log('error submit!')
  //     return false
  //   }
  // })
}
// particle配置项
const options = {
  background: {
    color: {
      value: "#2d3a4b",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
</script>
<style scoped lang="scss">
.formContainer{
  width: 500px;
  height: 300px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #000, $alpha: 0.5);
  color: #fff;
  text-align: center;
  border: 1px solid red;
  padding: 20px;

  h3{
    font-size: 30px;
  }
  .loginform{
    margin-top: 20px;
  }
}
::v-deep .el-form-item__label{
  color: #fff;
}
</style>
