<template>
     <el-aside>
        <el-menu >
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-user-solid"></i>账号管理
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/admin">
              <el-menu-item index="1-1">管理员</el-menu-item>
              </router-link>
              <router-link tag='li' to="/user">
              <el-menu-item index="1-2">用户</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>展品管理
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/type">
              <el-menu-item index="2-1">展区</el-menu-item>
              </router-link>
              <router-link tag="li" to="/item">
              <el-menu-item index="2-2">展品管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-comment"></i>留言模块
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/leavemsg">
              <el-menu-item index="3-1">游客留言</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>通知模块
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/safenotice">
              <el-menu-item index="4-1">通知</el-menu-item>
              </router-link>
              <router-link tag="li" to="/find">
              <el-menu-item index="4-2">寻找人员</el-menu-item>
              </router-link>
              <router-link tag="li" to="/lostandfound">
              <el-menu-item index="4-3">失物招领</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-warning"></i>反馈
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/feedback">
              <el-menu-item index="5-1">游客反馈</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-data-line"></i>数据统计
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/datatotal">
              <el-menu-item index="6-1">查看记录</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-document"></i>官网管理
            </template>
            <el-menu-item-group>
              <router-link tag="li" to="/allarticle">
              <el-menu-item index="7-1">文章</el-menu-item>
              </router-link>
              <router-link tag="li" to="/servercenter">
              <el-menu-item index="7-2">服务中心</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
</template>

<script>
export default {
    name:'Menu', 
}
</script>

<style scoped>

.el-aside {
  width: 200px !important;
  border-right: 1px solid #C0C4CC;
}
.el-menu {
  border: 0;
}
</style>
