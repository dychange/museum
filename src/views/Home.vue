<template>
  <el-container>
    <el-header>
      <router-link to="/">
        <img class="header-img" v-lazy="headerIcon" :key="headerIcon" />
      </router-link>
      <el-dropdown class="dropdown" @command="dropDownEvents">
        <div>
          <i class="el-icon-user"></i>
          <span class="el-dropdown-link">
            {{nickname}}
            <i class="el-icon-arrow-down"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">
            <i class="el-icon-edit"></i>
            修改个人资料
          </el-dropdown-item>
          <el-dropdown-item command="pass">
            <i class="el-icon-key"></i>
            修改密码
          </el-dropdown-item>
          <el-dropdown-item command="exit">
            <i class="el-icon-switch-button"></i>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-row>
      <el-col :span="24">
        <div class="Stripe"></div>
      </el-col>
    </el-row>

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
import { logout, isOnline } from "../api/user";
import { getDomain } from '../api/qiniu'
export default {
  name: "home",
  components: {
    HomeMenu
  },
  data() {
    return {
      nickname:"",
      headerIcon: "",
      timer: ""
    };
  },
  methods: {
    //退出登录
    dropDownEvents(command) {
      switch (command) {
        case "exit":
          logout().then(result => {
            if (result.data.status === 200) {
              clearLocalStorage();
              this.$message.success(result.data.msg);
              this.$router.replace("/login");
            }
          });
          break;
        case "edit":
          this.$router.push("/editself");
          break;
        case "pass":
          this.$router.push("/editpass");
      }
    }
  },
  created() {
    getDomain().then((result) => {
      if(result.data.status===200){
        this.headerIcon=result.data.info+'important/title.jpg'
      }
    })
    let userInfo = getUserInfoMessage("userInfo");
    if (userInfo.nickname === null) {
      this.nickname = userInfo.userName;
    } else {
      this.nickname = userInfo.nickname;
    }
  },
  mounted() {
    isOnline();
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        isOnline();
      }, 5000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  height: 90px !important;
  line-height: 90px;
  font-size: 20px;
  background-color: #fff;
}

.el-main {
  padding: 0 15px;
}

.dropdown {
  float: right;
  font-size: 16px;
  margin-right: 20px;
  color: #000;
}
.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  margin-left: -3px;
  font-size: 14px;
}
.header-img {
  width: 25%;
  height: 100%;
  margin-left: 2%;
}
.Stripe {
  height: 30px;
  background-color: #cc6633;
}
</style>
