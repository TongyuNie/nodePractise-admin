<template>
  <div>
    <el-card class="box-card1">
      <el-page-header :icon="null" title="门户管理">
        <template #content>
          <span class="text-large font-600 mr-3"> 用户列表 </span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag class="ml-2" type="danger" v-if="scope.row.role === 1"
              >管理员</el-tag
            >
            <el-tag class="ml-2" type="success" v-else>编辑</el-tag>
            <!-- <span>{{scope.row.role === 1? "管理员":"编辑"}}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别">
          <template #default="scope">
            <span>{{
              scope.row.gender === 0
                ? "保密"
                : scope.row.gender === 1
                ? "男"
                : "女"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              />
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="简介" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              title="确定删除吗"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="编辑用户"
      width="30%"
      :before-close="handleClose"
    >
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
          <el-input v-model="userForm.password" type="password" show-password/>
        </el-form-item>
        <el-form-item label="角色" prop="role">
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
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";

let tableData = ref([]);
let dialogVisible = ref(false);
const userFormRef = ref();
let userForm = reactive({
  username: "",
  password: "",
  role: 2, //1管理员2编辑
  introduction: "",
});
const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
  ]
});
const options = [
  { label: "管理员", value: 1 },
  { label: "编辑", value: 2 },
];

onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  console.log("res", res);
  tableData.value = res.data.data;
};
const handleEdit = async (data) => {
  dialogVisible.value = true;
   const res = await axios.get(`/adminapi/user/list/${data._id}`)
  console.log("编辑res", res.data.data[0])
  Object.assign(userForm, {
    ...res.data.data[0]
  })
};
const handleDelete = async (data) => {
  await axios.delete(`/adminapi/user/list/${data._id}`);
  getTableData();
};

const handleEditConfirm = ()=>{
  userFormRef.value.validate(async (valid)=>{
    if(valid){
      console.log("submit", userForm)
      await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
      dialogVisible.value= false
      getTableData()
      // router.push("/user-manage/userlist")

    }
  })
}
</script>


<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
</style>