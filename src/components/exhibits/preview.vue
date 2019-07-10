<template>
  <el-dialog
    title="预览"
    :visible.sync="previewDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    width="27%"
    top="0"
  >
  <div class="detail">
    <div >
      <div class="detail-container">
        <div class="detail-title">
          <div>{{detailInfo.Name}}</div>
        </div>
        <div class="detail-img">
          <img v-lazy="detailInfo.Img" />
        </div>
        <div class="detail-audio">
          <div class="audio">语音导览</div>
          <audio ref='audio' :src="detailInfo.Audio" controls preload="auto"></audio>
        </div>
        <div class="detail-info">
          <div>{{detailInfo.Content}}</div>
        </div>
      </div>
      <div class="location">
        <div style="font-weight:bold">您当前的位置:</div>
        <div class="address">上海天文博物馆</div>
        <div class="lnglat">当前经纬度:(121.19311,31.09435)</div>
        <div style="font-weight:bold">指定位置:</div>
        <div class="appoint">上海天文博物馆</div>
        <div class="lnglat">指定经纬度:(121.19311,31.09435)</div>
      </div>
    </div>
  </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Preview",
  props: {
    previewDialog: {
      type: Boolean,
      default: false
    },
    detailInfo:{
        type:Object
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:previewDialog", false);
      this.$refs.audio.pause()
      this.$refs.audio.currentTime=0
    }
  },
};
</script>

<style scoped>
.detail {
  padding: 0 15px 10px;
  background-color: #f0ffff;
}
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 20px;
}
.detail-img {
  margin: 25px 0 40px 0;
}
.detail-img img {
  width: 100%;
  height: 325px;
}
.detail-audio audio {
  width: 250px;
}
.detail-audio audio:focus {
  border: none !important;
  outline: none;
}
.detail-title {
  padding: 10px;
  text-align: center;
  margin-top: 30px;
  font-size: 20px;
  overflow: hidden;
  word-break: break-all;
  font-weight: 550;
}
.detail-info {
  padding: 10px 10px 20px;
  margin: 20px 0;
  line-height: 25px;
  font-size: 14px;
  border-bottom: 1px solid #c0c4cc;
  text-align: justify;
}

.audio {
  text-align: center;
  margin-bottom: 18px;
  font-weight: 550;
  font-size: 18px;
}
.location {
  padding: 10px;
}

.appoint,
.address,
.lnglat {
  font-size: 13px;
  margin: 5px 0;
  color: #ff6347;
}
</style>

