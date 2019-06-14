<template>
  <el-dialog
    title="新通告"
    :visible.sync="addDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form
      label-position="top"
      status-icon
      :model="newNoticeInfo"
      :rules="rules"
      ref="newNoticeInfo"
    >
      <el-form-item label="通告标题" prop="title">
        <el-input v-model="newNoticeInfo.title" @focus="clear('title')"></el-input>
      </el-form-item>
      <el-form-item label="通告说明" prop="content">
        <el-input
          type="textarea"
          v-model="newNoticeInfo.content"
          maxlength="1000"
          show-word-limit
          :autosize="{minRows: 5,maxRows:5}"
          resize="none"
          @focus="clear('content')"
        ></el-input>
      </el-form-item>
      <el-form-item label="通告类型/是否发布" required>
        <el-select v-model="newNoticeInfo.type" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
        <el-switch
          v-model="newNoticeInfo.status"
          class="demo"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
          active-text="发布"
          inactive-text="不发布"
          @change="openNotice"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createNotice('newNoticeInfo')">创建</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addNoticeInfo } from "../../api/notices";
import {getUserInfoMessage} from '../../utils/localStorage'
export default {
  name: "AddNotice",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["newNoticeInfo"].resetFields();
        this.newNoticeInfo.type = "";
        this.newNoticeInfo.status = 0;
      });
      this.$emit("update:addDialog", false);
    },
    openNotice(val){
      this.newNoticeInfo.status=val
    },
    // 创建新的公告
    createNotice(formName) {
      // 表单提交验证
      this.$refs[formName].validate(valid => {
        if (valid && this.newNoticeInfo.type != undefined) {
          let newNoticeInfo = this.newNoticeInfo;
          addNoticeInfo(newNoticeInfo).then(result => {
            if (result.data.status === 200) {
              this.$message.success(result.data.msg);
              this.closeDialog()
              this.$emit('getAllNoticeList')
            }
          });
        } else {
          this.$message.error("请正确填写信息");
        }
      });
    },
    clear(prop) {
      this.$refs["newNoticeInfo"].clearValidate(prop);
    }
  },
  created() {
    this.newNoticeInfo.operatorId=getUserInfoMessage('userInfo').id
  },
  data() {
    return {
      newNoticeInfo: {
        title: "",
        content: "",
        type: this.value,
        status: 0,
        operatorId:null
      },
      rules: {
        title: [
          { required: true, message: "请填写标题", trigger: "blur" },
          {
            max: 100,
            message: "最大只能100位",
            trigger: "blur"
          }
        ],
        content:[
          {
            required: true, message: "请填写说明", trigger: "blur"
          }
        ]
      },
      value: "",
      types: [
        {
          value: 2,
          label: "紧急通告"
        },
        {
          value: 1,
          label: "普通通告"
        }
      ]
    };
  }
};
</script>

<style scoped>
.demo {
  margin-left: 100px;
}
</style>
