<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="新闻管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 新闻列表 </span>
      </template>
    </el-page-header>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="categrey" label="分类">
          <template #default="scope">
            {{categreyFormat(scope.row.categrey)}}
          </template>
        </el-table-column>
        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{formatTime.getTime(scope.row.editTime)}}
          </template>
        </el-table-column>
        <el-table-column prop="isPublish" label="是否发布">
          <template #default="scope">
            <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
            @change="handleSwitchChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
            <el-button circle :icon="Edit" type="default" @click="handleEdit(scope.row)"></el-button>
            <el-popconfirm
              title="确定删除吗"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button circle :icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="预览新闻"
      width="30%"
    >
    <div>
      <h2>{{previewData.title}}</h2>
      <div style="color: grey; font-size: 12px">{{formatTime.getTime(previewData.editTime)}}</div>
      <el-divider> <el-icon><star-filled /></el-icon></el-divider>
      <div v-html="previewData.content" class="htmlContent"></div>
    </div>
    </el-dialog>
   
  </div>
</template>

<script setup>
import axios from 'axios'
import {useRouter} from "vue-router"
import {ref, onMounted} from 'vue'
import formatTime from "@/util/formatTime.js"
import {Star, Edit, Delete, StarFilled } from "@element-plus/icons-vue"

let tableData = ref([])
let previewData = ref({})
let dialogVisible = ref(false)
const router = useRouter()

onMounted(()=>{
  getTableData()
})
const getTableData =async ()=> {
  const res = await axios.get("/adminapi/news/list")
  console.log("新闻列表", res.data)
  tableData.value = res.data.data
}
const categreyFormat = (value)=> {
  const arr = ["最新动态", "典型案例", "通知公告"]
  return arr[value-1]
}
const handleSwitchChange = async (item) => {
  await axios.put("/adminapi/news/publish", {
    _id: item._id,
    isPublish: item.isPublish
  })
  await getTableData()
}

const handleDelete = async (item) => {
  await axios.delete(`/adminapi/news/list/${item._id}`)
  await getTableData()
}

const handlePreview = async (item) => {
  dialogVisible.value = true
  previewData.value = item
}

const handleEdit = (item) => {
  router.push(`/news-manage/editnews/${item._id}`)
}

</script>

<style lang="scss" scoped>
.el-table{
  margin-top: 30px
}
.htmlContent{
  img:{
    max-width: 100%;
  }
}
</style>
