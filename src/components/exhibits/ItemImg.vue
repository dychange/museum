<template>
  <el-dialog
    :visible.sync="imgDialog"
    :before-close="closeDialog"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    top='5vh'
  >
  <el-image :src="Img" lazy >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
  </el-dialog>
</template>

<script>
export default {
  name: "ItemImg",
  methods: {
    closeDialog() {
      this.$emit("update:imgDialog", false);
    }
  },
  props: {
    imgDialog: {
      type: Boolean
    },
    Img:{
        type:String
    }
  }
};
</script>

<style scoped>
.el-image{
  width: 100%;
}
</style>
