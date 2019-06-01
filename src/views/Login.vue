<template>
  <el-container>
    <el-header>上海博物馆后台管理系统</el-header>
    <el-container>
      <el-main>
        <el-form status-icon class="login-ruleForm">
          <div class="title">管理员登录</div>
          <el-form-item class="inputuser">
            <label class="usericon">
              <i class="el-icon-s-custom"></i>
            </label>
            <el-input
              class="info"
              type="text"
              v-model="username"
              placeholder="请输入帐号"
              clearable
              @keyup.enter.native="loginIn"
            ></el-input>
          </el-form-item>
          <el-form-item class="inputpassword">
            <label class="usericon">
              <i class="el-icon-lock"></i>
            </label>
            <el-input
              class="info"
              type="password"
              v-model="password"
              placeholder="请输入密码"
              clearable
              @keyup.enter.native="loginIn"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginIn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { login } from "../api/user";
import { saveUserInfo,getUserInfoMessage } from "../utils/localStorage";
import { competitionMixin } from "../utils/mixins";
export default {
  name: "Login",
  mixins: [competitionMixin],
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    //登录
    loginIn() {
      if (this.username === "" || this.password === "") {
        this.$message.warning({
          message: "用户名或密码不能为空",
          duration: 1500
        });
      } else {
        let username = this.username;
        let password = this.password;
        let userInfo = `username=${username}&password=${password}`;
        login(userInfo)
          .then(result => {
            console.log(result);
            let status = result.data.status;
            if (status === 400) {
              this.$message.error({
                message: result.data.msg,
                duration: 1500
              });
            } else if (status === 200) {
                this.setUserInfo(username);
              saveUserInfo("userInfo", result.data.info);
              this.$message.success({
                message: "登录成功",
                duration: 1500
              });
              this.$router.push("/");
            }
          })
      }
    }
  },
  mounted() {
    //加载页面时判断是否有用户缓存,如果有则表示已登录,再返回主页
    if (getUserInfoMessage("userInfo")) {
      this.$router.replace("/");
    }
  }
};
</script>


<style scoped>
.el-header,
.el-footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-main {
  height: 670px;
  background: url(https://www.shanghaimuseum.net/museum/images/header-login.jpg)
    no-repeat center top;
  background-color: #000;
  color: #333;
  text-align: center;
}

.login-ruleForm {
  width: 300px;
  padding: 25px;
  background-color: #f5f5f5;
  position: absolute;
  border-radius: 10px;
  top: 180px;
  right: 300px;
}
.title {
  height: 18px;
  line-height: 18px;
  font-size: 16px;
  color: #3c3c3c;
  margin-top: 9px;
  padding-bottom: 15px;
  font-weight: 700;
}

.inputuser {
  position: relative;
}

.info {
  width: 245px !important;
  padding-left: 5px;
}

.usericon {
  width: 40px;
  height: 40px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: #ddd;
}

.el-icon-s-custom,
.el-icon-lock {
  font-size: 22px;
  margin-top: 8px;
}
.el-button {
  width: 275px;
  margin-left: -25px;
}
</style>
