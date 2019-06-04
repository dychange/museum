<template>
  <el-container>
    <el-header>
      <router-link tag="a" to="/">
        <img class="header-img" src="../assets/imgs/headericon.jpg">
      </router-link>
      <span >上海天文博物馆后台管理系统</span>
      <el-dropdown class="dropdown" @command="dropDownEvents">
        <span class="el-dropdown-link">
          {{nickname}}
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command="edit">修改</el-dropdown-item>
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
import {
  getUserInfoMessage,
  saveUserInfo,
  clearLocalStorage
} from "../utils/localStorage";
import { competitionMixin } from "../utils/mixins";
import { mapGetters } from "vuex";
export default {
  name: "home",
  mixins: [competitionMixin],
  components: {
    HomeMenu
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
          this.$router.push('/editself')
      }
    }
  },
  computed: {
    ...mapGetters({
      username: "nickname"
    }),
    //计算用户名,如果没有用户名则默认使用帐号当作用户名
    nickname() {
      let userInfo = getUserInfoMessage("userInfo");
      let nickname = userInfo.nickname;
      if (nickname === null) {
        nickname = this.username;
        userInfo.nickname = nickname;
        saveUserInfo("userInfo", userInfo);
      }
      return nickname;
    }
  }
};
</script>

<style scoped>
.el-container {
  height: 670px;
}
.el-header {
  line-height: 60px;
  font-size: 20px;
  background-color: #ccc;
}

.el-main {
  background: url('../assets/imgs/header.jpg') no-repeat center center #ccc;
}
.dropdown {
  float: right;
  font-size: 18px;
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
