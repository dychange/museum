<template>
  <el-container>
    <el-header>
      <span>abc</span>
    </el-header>
    <el-container>
     <home-menu></home-menu>
      <el-main>123</el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeMenu from '../components/home/Menu'
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
  text-align: right;
  font-size: 12px;
}


.el-main {
  background-color: #f5f5f5;
}
</style>
