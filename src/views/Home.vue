<template>
  <el-container>
    <el-header>
      <el-dropdown class="dropdown" trigger="click">
        <span>
          欢迎,管理员:ABC
          <i class="el-icon-setting"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
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
export default {
  name: "home",
  components: {
    HomeMenu
  }
};
</script>

<style scoped>
.el-container {
  height: 680px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  font-size: 20px;
}

.el-main {
  background-color: #f5f5f5;
}
.dropdown{
  float: right;
  font-size: 20px;
  margin-right: 20px;
}
</style>
