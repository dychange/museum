<template>
  <div class="container">
    <div>个人资料</div>
    <el-form
      label-position="right"
      label-width="100px"
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userInfo.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="telephone">
        <el-input v-model="userInfo.telephone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userInfo')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfoMessage , saveUserInfo} from "../utils/localStorage";
import { editInfo } from "../api/user";
export default {
  name: "EditSelf",
  inject:['reload'],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userInfo = this.userInfo;
          editInfo(userInfo).then(result => {
            if (result.data.status === 200) {
              let oldInfo=getUserInfoMessage('userInfo')
              let newInfo=Object.assign(oldInfo,userInfo)
              saveUserInfo('userInfo',newInfo)
              this.$message.success('修改成功')
              this.$refs[formName].resetFields();
              this.reload()
              this.$router.push("/");
            }
          });
        }
      });
    }
  },
  data() {
    return {
      userInfo: {
        id: null,
        nickname: "",
        telephone: "",
        userName: ""
      },
      rules: {
        nickname: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        telephone: [
          {
            required: true,
            message: "联系方式不能为空",
            trigger: "blur"
          },
          {
            pattern: "^1(3|4|5|7|8)\\d{9}$",
            message: "请填写正确电话号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.userInfo.nickname = getUserInfoMessage("userInfo").nickname;
    this.userInfo.telephone = getUserInfoMessage("userInfo").telephone;
    this.userInfo.userName = getUserInfoMessage("userInfo").userName;
    this.userInfo.id = getUserInfoMessage("userInfo").id;
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
.el-form {
  width: 500px;
  margin: 100px auto;
}
</style>
