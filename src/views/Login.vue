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
              v-model="ruleForm.username"
              autocomplete="off"
              placeholder="请输入帐号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="inputpassword">
            <label class="usericon">
              <i class="el-icon-lock"></i>
            </label>
            <el-input
              class="info"
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              placeholder="请输入密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginIn" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    loginIn() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$message({
          type: "success",
          message: "登录成功",
          duration: 1000
        });
      }, 1000);
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
