<template>
  <div id="quillEditorQiniu">
    <!-- 基于elementUi的上传组件 el-upload begin-->
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :accept="'image/*'"
      :data="qiniuForm"
      :show-file-list="false"
      :on-success="uploadEditorSuccess"
      :on-error="uploadEditorError"
      :before-upload="beforeUploadImg"
    ></el-upload>
    <!-- 基于elementUi的上传组件 el-upload end-->
    <quill-editor
      class="editor"
      v-model="content"
      ref="customQuillEditor"
      :options="editorOption"
      @change="handleChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
import { getToken } from "../../api/qiniu";
import { quillEditor } from "vue-quill-editor";
import "../../assets/styles/snow.css";
//自定义编辑器的工作条
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"] // remove formatting button
];
export default {
  name: "SelfEditor",
  data() {
    return {
      quillUpdateImg: false,
      content: "",
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document
                    .querySelector("#quillEditorQiniu .avatar-uploader input")
                    .click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      qiniuForm: {
        key: "",
        token: ""
      },
      qntimer: "",
      domain: ""
    };
  },
  props: {
    uploadUrl: String, //从七牛云上拿到自己的上传地址,类型为String
    editContent: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleChange(e) {
      let Domain = this.domain.split("://");
      let Names = Domain[1].split(".");
      let reg =
        "<[img|IMG].*?src=['|\"]((?!" +
        Domain[0] +
        "://" +
        Names[0] +
        "." +
        Names[1] +
        ").*?(?:[.jpg|.jpeg|.png|.gif|.bmp]))['|\"].*?[/]?>";
      let regexp = new RegExp(reg);
      this.content = e.html.replace(regexp, "");
    },
    beforeUploadImg(file) {
      let type = file.type.split("/")[0];
      const is1M = file.size / 1024 / 1024 < 1;
      if (type !== "image") {
        this.$message.error("只能上传图片");
        return false;
      } else if (!is1M) {
        this.$message.error("图片大小不能超过1M");
        return false;
      } else {
        return file;
      }
    },
    // 上传图片成功
    uploadEditorSuccess(res, file) {
      //拼接出上传的图片在服务器的完整地址
      let imgUrl = this.domain + res.key;

      //重置上传文件key，为下次上传做好准备
      this.qiniuForm.key =
        new Date().getTime() + "" + Math.floor(Math.random() * 1000) + ".jpg";

      // 获取富文本组件实例
      let quill = this.$refs.customQuillEditor.quill;

      // 获取光标所在位置
      let length = quill.getSelection().index;

      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, "image", imgUrl);

      // 调整光标到最后
      quill.setSelection(length + 1);
    },

    // 上传图片失败
    uploadEditorError(res, file) {
      //页面提示
      this.$message.error({
        message: "上传图片失败"
      });
    }
  },
  created() {
    this.qiniuForm.key =
      new Date().getTime() + "" + Math.floor(Math.random() * 1000) + ".jpg";
    getToken().then(result => {
      if (result.data.status === 200) {
        this.qiniuForm.token = result.data.info.token;
        this.domain = result.data.info.bucketHostName;
      }
    });
    this.qntimer = setInterval(() => {
      getToken().then(result => {
        if (result.data.status === 200) {
          this.domain = result.data.info.bucketHostName;
          this.qiniuForm.token = result.data.info.token;
        }
      });
    }, 60 * 60 * 1000);
    if (this.editContent !== "") {
      this.content = this.editContent;
    }
  },
  beforeDestroy() {
    clearInterval(this.qntimer);
  },
  watch: {
    content(newVal, oldVal) {
      this.$emit("input", newVal);
    },
    editContent(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.content = newVal;
      }
    }
  },
  components: {
    quillEditor
  }
};
</script>

<style >
.ql-editor {
  height: 600px;
  padding: 12px 200px;
}
.ql-snow .ql-editor img {
  max-width: 100%;
}
.ql-snow .ql-tooltip {
  left: 0 !important;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
#disabledMsg.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  color: #bfd9d8;
  background-color: #eef6f6;
  border-color: #d1e5e5;
}
</style>