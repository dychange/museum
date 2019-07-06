<template>
  <el-dialog
    title="新增展品"
    :visible.sync="addDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    top="2vh"
    width="40%"
  >
    <el-form label-position="top" status-icon :model="newItemInfo" :rules="rules" ref="newItemInfo">
      <el-form-item label="展品名称" prop="name">
        <el-input v-model="newItemInfo.name" @focus="clear('name')"></el-input>
      </el-form-item>
      <el-form-item label="展品文字说明" prop="info">
        <el-input
          type="textarea"
          v-model="newItemInfo.info"
          maxlength="2000"
          show-word-limit
          :autosize="{minRows: 5,maxRows:5}"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片上传" required>
        <el-upload
          ref="imgUp"
          class="upload-demo"
          :action="qiniuAction"
          list-type="picture"
          :data="imgtoken"
          :on-error="errorImg"
          :limit="1"
          :before-upload="beforeUploadImg"
        >
          <el-button size="small" type="primary" @click="qiniuToken">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件且只能上传一张</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="音频上传" required>
        <el-upload
          ref="audioUp"
          class="upload-demo"
          :action="qiniuAction"
          :data="audiotoken"
          :on-error="errorAudio"
          :limit="1"
          :before-upload="beforeUploadAudio"
        >
          <el-button size="small" type="primary" @click="qiniuToken">选择音频</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp3文件且只能上传一个</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="展品类型" required>
        <el-select v-model="newItemInfo.typeId" filterable placeholder="请选择">
          <el-option v-for="item in types" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createItem('newItemInfo')">添加</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTypeName, addItem } from "../../api/item";
import { getUserInfoMessage, saveUserInfo } from "../../utils/localStorage";
import { getToken } from "../../api/qiniu";
import { rename } from "../../lib/handleData";
export default {
  name: "AddItem",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    errorImg(err, file, fileList) {
      console.log("img", err);
    },
    beforeUploadImg(file) {
      let type = file.type.split("/")[0];
      if (type !== "image") {
        this.$message.error("只能上传图片");
        return false;
      } else {
        this.imgtoken.key = rename(file);
      }
    },
    errorAudio(err, file, fileList) {
      console.log("audio", err);
    },
    beforeUploadAudio(file) {
      let type = file.type.split("/")[0];
      if (type !== "audio") {
        this.$message.error("只能上传音频");
        return false;
      } else {
        this.audiotoken.key = rename(file);
      }
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["newItemInfo"].resetFields();
      });
      this.newItemInfo.typeId = null;
      this.$emit("update:addDialog", false);
      this.$refs.imgUp.clearFiles();
      this.$refs.audioUp.clearFiles();
    },
    // 创建新的商品
    createItem(formName) {
      // 表单提交验证
      this.$confirm("系统会自动生成该展品二维码,是否确定新增展品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[formName].validate(valid => {
            if (
              valid &&
              this.newItemInfo.typeId !== null &&
              this.imgtoken.key !== "" &&
              this.audiotoken.key !== ""
            ) {
              this.newItemInfo.imgName = this.imgtoken.key;
              this.newItemInfo.audioName = this.audiotoken.key;
              this.newItemInfo.operatorId = getUserInfoMessage("userInfo").id;
              let ItemInfo = this.newItemInfo;
              addItem(ItemInfo).then(result => {
                if (result.data.status === 200) {
                  this.$message.success("添加成功");
                  this.closeDialog();
                  this.$emit("getAllItem");
                }
              });
            } else {
              this.$message.error("请填写完整信息");
            }
          });
        })
        .catch(() => {});
    },
    clear(prop) {
      this.$refs["newItemInfo"].clearValidate(prop);
    },
    // rename(file) {
    //   return (
    //     "museum/" +
    //     createRandom() +
    //     file.name.substring(file.name.lastIndexOf("."))
    //   );
    // },
    qiniuToken() {
      if (!getUserInfoMessage("qiniu")) {
        getToken().then(result => {
          if (result.data.status === 200) {
            saveUserInfo("qiniu", result.data.info);
            this.imgtoken.token=this.audiotoken.token=result.data.info
          }
        });
      } else {
        this.imgtoken.token = this.audiotoken.token= getUserInfoMessage("qiniu");
      }
    }
  },
  data() {
    return {
      newItemInfo: {
        typeId: null,
        name: "",
        info: "",
        operatorId: null,
        audioName: "",
        imgName: ""
      },
      qiniuAction: "http://upload.qiniup.com",
      imgtoken: {
        token: "",
        key: ""
      },
      audiotoken: {
        token: "",
        key: ""
      },
      types: [],
      rules: {
        name: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            required: true,
            message: "展品名称不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    getTypeName().then(result => {
      if (result.data.status === 200) {
        let info = result.data.info;
        let obj = { value: "" };
        for (let i in info) {
          obj.value = info[i].typeName;
          Object.assign(info[i], obj);
        }
        this.types = info;
      }
    });
  }
};
</script>

<style scoped>
.el-upload__tip {
  margin: 0;
  height: 20px;
  line-height: 20px;
}
</style>
