<template>
  <div id="app" @click="isAlive" tabindex="0" @mouseover="isAlive" @keydown="isAlive">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { getUserInfoMessage, clearLocalStorage } from "./utils/localStorage";
import { logout , isOnline} from "./api/user";
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      timeout: 60 * 60 * 1000,
      currentTime: new Date().getTime()
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    isAlive() {
      let lastTime = new Date().getTime();
      if (
        lastTime - this.currentTime >= this.timeout &&
        getUserInfoMessage("userInfo")
      ) {
        logout().then(result => {
          if (result.data.status === 200) {
            clearLocalStorage();
            this.$message.error("由于长时间未操作,已退出登录");
            this.$router.replace("/login");
          }
        });
      } else {
        this.currentTime = lastTime;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  outline: 0;
}
.moduleTitle {
  font-size: 13px;
  line-height: 25px;
  border-bottom: 1px solid #c0c4cc;
  margin-bottom: 10px;
}

.el-pagination__total,
.header th {
  color: #000 !important;
}
.el-textarea .el-input__count {
  bottom: -40px !important;
}
.pagination {
  text-align: center;
}
.add-btn {
  float: right;
  margin-bottom: 10px !important;
}
.el-button--primary {
  background-color: #cc6633 !important;
  border-color: #cc6633 !important;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #ee7700 !important;
  border-color: #ee7700 !important;
}
.el-table thead {
  font-weight: bolder !important;
}
.el-table td,
.el-table th {
  padding: 6px 0 !important;
}
.el-form--label-top .el-form-item__label {
  height: 30px;
  line-height: 30px;
  padding: 0 !important;
}
.el-form-item {
  margin-bottom: 16px !important;
}
.el-input__inner {
  height: 36px !important;
  line-height: 36px !important;
}
.el-dialog__body,
.el-dialog__header {
  padding: 10px 15px !important;
}
.header th {
  background-color: #dcdcdc !important;
}
.el-tooltip__popper {
  max-width: 20%;
}
</style>
