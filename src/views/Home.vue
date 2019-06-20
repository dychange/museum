<template>
  <el-container>
    <el-header>
      <router-link tag="a" to="/">
        <img class="header-img" v-lazy="headerImg" :key="headerImg">
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
      <el-main v-lazy:background-image="mainImg" :key="mainImg">
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
      nickname: "",
      mainImg: '',
      headerImg: require("../assets/imgs/headericon.png")
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$route.path === "/") {
        vm.$data.mainImg = require("../assets/imgs/main.png");
      }else{
        vm.$data.mainImg = "";
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if(to.path==='/'){
      this.mainImg=require("../assets/imgs/main.png")
      next()
    }else{
      this.mainImg=''
      next()
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
  height: 70px !important;
  line-height: 70px;
  font-size: 20px;
  background-color: #000;
  color: #fff;
}

.dropdown {
  float: right;
  font-size: 16px;
  margin-right: 20px;
  color: #fff;
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
  border-radius: 60%;
  margin-right: 10px;
  margin-top: 10px;
  margin-left: 2%;
}
.el-main {
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #f5f5f5;
}
</style>
