<template>
  <el-dialog
    title="预览"
    :visible.sync="previewDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    top="2vh"
    width='70%'
  >
    <div class="header">
      <div class="title">{{previewInfo.title}}</div>
      <ul class="msg">
        <li>录入者:{{previewInfo.inputer}}</li>
        <li>时间:{{previewInfo.addTime}}</li>
        <li>作者:{{previewInfo.author}}</li>
        <li>来源:{{previewInfo.source}}</li>
        <li>浏览:{{previewInfo.views}}次</li>
      </ul>
    </div>
    <div class="content" v-html="previewInfo.content"></div>
  </el-dialog>
</template>

<script>
import '../../assets/styles/snow.css'
export default {
  name: "Preview",
  props: {
    previewDialog: {
      type: Boolean,
      default: false
    },
    previewInfo: {
      type: Object
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:previewDialog", false);
    }
  }
};
</script>


<style >
.header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.title {
  font-size: 22px;
  font-weight: 450;
  color: #f56c6c;
  text-align: center;
  margin-bottom: 10px;
}
.msg {
  text-align: center;
}
.msg li {
  display: inline;
  margin: 5px 0 5px 5px;
  padding-right: 5px;
  border-right: 1px solid #ccc;
  font-size: 16px;
}
.msg li:first-child {
  margin-left: 0;
  padding-left: 5px;
  border-left: 1px solid #ccc;
}
p img {
  max-width: 100%;
}
</style>
