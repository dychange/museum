<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  provide(){
      return{
        reload:this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true,
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        });
      },
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.el-pagination__total , .header th{
  color: 	#000 !important;
}
.el-textarea .el-input__count {
  bottom: -40px !important;
}
.pagination {
  text-align: center;
}
.add-btn {
  float: right;
  margin-bottom: 20px !important;
}
 .el-table thead{
  font-weight: bolder !important;
}
.el-table td, .el-table th{
  padding: 6px 0 !important;
}
.el-form--label-top .el-form-item__label{
  padding: 0 !important;
}
.el-form-item{
  margin-bottom: 15px !important;
}
.el-input__inner{
  height: 36px !important;
  line-height: 36px !important;
}
.el-dialog__body{
  padding: 20px !important;
}
.header th{
  background-color: 	#DCDCDC !important;
}
</style>
