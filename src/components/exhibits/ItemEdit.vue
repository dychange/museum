<template>
  <el-dialog
    title="展品更新"
    :visible.sync="editDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    top='4vh'
    width="40%"
  >
    <el-form label-position="top" status-icon :model="editItem" :rules="rules" ref="editItem">
      <el-form-item label="展品名称" prop="name">
        <el-input v-model="editItem.name" @focus="clear('name')"></el-input>
      </el-form-item>
      <el-form-item label="展品文字说明" prop="info">
        <el-input
          type="textarea"
          v-model="editItem.info"
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
          :file-list='imgList'
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
          :file-list="audioList"
        >
          <el-button size="small" type="primary" @click="qiniuToken">选择音频</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp3文件且只能上传一个</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="展品类型" required>
        <el-select v-model="editItem.typeId" filterable placeholder="请选择">
          <el-option v-for="item in types" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveInfo('editItem')">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getToken } from "../../api/qiniu";
import { getTypeName, updateItem } from "../../api/item";
import {rename} from '../../lib/handleData'
import { saveUserInfo, getUserInfoMessage} from '../../utils/localStorage'
export default {
  name: "ItemEdit",
  methods: {
     errorImg(err, file, fileList) {
    },
    beforeUploadImg(file) {
      let type = file.type.split("/")[0];
      if (type !== "image") {
        this.$message.error("只能上传图片");
        return false;
      } else {
        this.editItem.oldImg=this.imgtoken.key
        this.imgtoken.key = rename(file);
      }
    },
    errorAudio(err, file, fileList) {
    },
    beforeUploadAudio(file) {
      let type = file.type.split("/")[0];
      if (type !== "audio") {
        this.$message.error("只能上传音频");
        return false;
      } else {
        this.editItem.oldAudio=this.audiotoken.key
        this.audiotoken.key = rename(file);
      }
    },
    saveInfo(formName) {
      this.$confirm("确认保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[formName].validate(valid => {
            if (valid && this.imgtoken.key !== "" && this.audiotoken.key !== "") {
              this.editItem.imgName=this.imgtoken.key
              this.editItem.audioName=this.audiotoken.key
              let editItem = this.editItem;
              updateItem(editItem).then(result => {
                if (result.data.status === 200) {
                  this.$message.success(result.data.msg),
                  this.closeDialog()
                  this.$emit("currentChange", this.curpage);
                }
              });
            } else {
              this.$message.error("请填写正确信息");
            }
          });
        })
        .catch(() => {});
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["editItem"].resetFields();
      });
      this.$emit("update:editDialog", false);
      this.$refs.imgUp.clearFiles()
      this.$refs.audioUp.clearFiles()
    },
    clear(prop) {
      this.$refs["editItem"].clearValidate(prop);
    },
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
    },
    //  rename(file) {
    //   return (
    //     "museum/" +
    //     createRandom() +
    //     file.name.substring(file.name.lastIndexOf("."))
    //   );
    // },
  },
  data() {
    return {
      qiniuAction: "http://upload.qiniup.com",
      imgList:[], 
      audioList:[], 
      imgtoken: {
        token: "",
        key: ""
      },
      audiotoken: {
        token: "",
        key: ""
      },
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
        ],  
      },
      types: []
    };
  },
  watch: {
    editItem(newVal,oldVal){
      if(newVal!== oldVal ){
        let imgname=this.editItem.imgName
        let audioname=this.editItem.audioName
        this.imgList=[{name:imgname.substring(imgname.indexOf('/museum')),url:imgname}]
        this.audioList=[{name:audioname.substring(audioname.indexOf('/museum')),url:audioname}]
        this.imgtoken.key=imgname
        this.audiotoken.key=audioname
      }
    }
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    },
    editItem: {
      type: Object
    },
    curpage: {
      type: Number
    }
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


