<template>
  <div>
    <el-page-header :icon="null" title="新闻管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 创建新闻 </span>
      </template>
    </el-page-header>
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
       <MyEditor @event="handleChange"></MyEditor>
      </el-form-item>
      <el-form-item label="分类" prop="categrey">
        <el-select v-model="newsForm.categrey" class="m-2" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <Uploadd :avatar="newsForm.cover" @changeU="changeCover"></Uploadd>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">创建新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive} from 'vue'
import MyEditor from '@/components/editor/Editor.vue'
import Uploadd from "@/components/upload/Upload.vue"
import upload from "@/util/upload.js";
import {useRouter } from 'vue-router'

const router = useRouter()
const newsFormRef = ref()
const newsForm = reactive({
  title: "",
  content: "",
  categrey: 1, //1最新动态, 2典型案例, 3通知公告
  cover: "",
  file: null,
  isPublish: 0, //0未发布, 1已发布
})
const newsFormRules = reactive({
  title: [{
    required: true, message: "请输入标题", trigger: 'blur'
  }],
  content: [{
    required: true, message: "请输入内容", trigger: 'blur'
  }],
  categrey: [{
    required: true, message: "请选择分类", trigger: 'blur'
  }],
  cover: [{
    required: true, message: "请上传图片", trigger: 'blur'
  }],
})
const options = [
  { label: "最新动态", value: 1 },
  { label: "典型案例", value: 2 },
  { label: "通知公告", value: 3 },
];

const handleChange = (data) => {
  console.log("dataaa", data)
  newsForm.content = data
}
const changeCover = (file) => {
  console.log("文件改变；", file, URL.createObjectURL(file));
  newsForm.cover = URL.createObjectURL(file); //本地回显
  newsForm.file = file; //提交给后端
};
const submitForm = ()=>{
  newsFormRef.value.validate(async (valid)=>{
    if(valid){
      console.log("submit", newsForm)
      await upload("/adminapi/news/add", newsForm)
      router.push("/news-manage/newslist")
    }
  })
}
</script>

<style lang="scss" scoped>
.el-form{
  margin-top: 50px
}
</style>