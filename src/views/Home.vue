<template>
  <el-container>
    <el-header>
      <router-link tag="a" to="/">
        <img class="header-img" src="../assets/imgs/headericon.jpg">
      </router-link>
      <span>上海天文博物馆后台管理系统</span>
      <el-dropdown class="dropdown" @command="dropDownEvents">
        <div>
          <i class="el-icon-user"></i>
          <span class="el-dropdown-link">
            {{nickname}}
            <i class="el-icon-arrow-down"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">修改个人资料</el-dropdown-item>
          <el-dropdown-item command="pass">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <home-menu></home-menu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeMenu from "./Menu";
import { getUserInfoMessage, clearLocalStorage } from "../utils/localStorage";
export default {
  name: "home",
  components: {
    HomeMenu
  },
  data() {
    return {
      nickname: ""
    };
  },
  methods: {
    //退出登录
    dropDownEvents(command) {
      switch (command) {
        case "exit":
          clearLocalStorage();
          this.$message.success({
            message: "已退出",
            duration: 1000
          });
          this.$router.replace("/login");
          break;
        case "edit":
          this.$router.push("/editself");
          break;
        case "pass":
          this.$router.replace("/editpass");
      }
    }
  },
  created() {
    let userInfo = getUserInfoMessage("userInfo");
    if (userInfo.nickname === null) {
      this.nickname = userInfo.userName;
    } else {
      this.nickname = userInfo.nickname;
    }
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  line-height: 60px;
  font-size: 20px;
  background-color: #ccc;
}

.dropdown {
  float: right;
  font-size: 16px;
  margin-right: 20px;
}
.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  margin-left: -3px;
  font-size: 14px;
}
.header-img {
  float: left;
}
</style>
