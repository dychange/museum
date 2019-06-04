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
      <el-form-item label="名称" prop="nickname">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input v-model="userInfo.checkpass"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="telephone">
        <el-input v-model="userInfo.telephone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfoMessage } from "../utils/localStorage";
export default {
  name: "EditSelf",
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    }
  },
  data() {
    const validatePass = (rule, val, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (val !== this.userInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        nickname: "",
        password: "",
        checkpass: "",
        telephone: ""
      },
      rules: {
        password: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            max: 18,
            message: "最大只能18位密码",
            trigger: "blur"
          }
        ],
        checkpass: [{ validator: validatePass, trigger: "blur" }],
        telephone: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            pattern: "^[0-9]",
            message: "只能由数字组成",
            trigger: "blur"
          },
          {
            max: 11,
            message: "最大只能11位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.userInfo.nickname = getUserInfoMessage("userInfo").nickname;
    this.userInfo.telephone = getUserInfoMessage("userInfo").telephone;
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
