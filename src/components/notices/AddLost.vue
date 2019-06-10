<template>
  <el-dialog
    title="新增失物招领信息"
    :visible.sync="addDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form label-position="top" status-icon :model="newLostInfo" :rules="rules" ref="newLostInfo">
      <el-form-item label="物品名称" prop="articleName">
        <el-input v-model="newLostInfo.articleName" @focus="clear('articleName')"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="remark">
        <el-input
          type="textarea"
          v-model="newLostInfo.remark"
          maxlength="2000"
          show-word-limit
          :autosize="{minRows: 5,maxRows:5}"
          resize="none"
          @focus="clear('remark')"
        ></el-input>
      </el-form-item>
      <el-form-item label="丢失地点" prop="lostPlace">
        <el-input v-model="newLostInfo.lostPlace" @focus="clear('lostPlace')"></el-input>
      </el-form-item>
      <el-form-item label="丢失时间" prop="lostTime">
        <el-date-picker
          v-model="newLostInfo.lostTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createLost('newLostInfo')">创建</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addLostInfo } from "../../api/notices";
import {getUserInfoMessage} from '../../utils/localStorage'
export default {
  name: "AddLost",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["newLostInfo"].resetFields();
      });
      this.$emit("update:addDialog", false);
    },
    // 创建新的管理员
    createLost(formName) {
      // 表单提交验证
      this.$refs[formName].validate(valid => {
        if (valid && this.newLostInfo.lostTime !==null) {
          let lostInfo = this.newLostInfo;
          addLostInfo(lostInfo).then(result => {
            if (result.data.status === 200) {
              this.$message.success("发布成功");
              this.$emit("update:addDialog", false);
              this.$refs["newLostInfo"].resetFields();
              this.$emit('getAllLost')
            }
          });
        } else {
          this.$message.error("请填写正确丢失信息");
        }
      });
    },
    clear(prop) {
      this.$refs["newLostInfo"].clearValidate(prop);
    }
  },
  data() {
    return {
      newLostInfo: {
          articleName:'',
          remark:'',
          lostPlace:'',
          lostTime:null,
          operatorId:null
      },
      rules: {
        articleName: [
          {
            required: true,
            message: "请填写丢失物品名称",
            trigger: "blur"
          }
        ],
        remark:[
             {
            required: true,
            message: "请填写物品丢失说明",
            trigger: "blur"
          }
        ],
        lostPlace:[
             {
            required: true,
            message: "请填写物品丢失地点",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
      this.newLostInfo.operatorId=getUserInfoMessage('userInfo').id
  },
};
</script>

<style >
.el-textarea .el-input__count {
  color: #909399;
  background: #fff;
  position: absolute;
  font-size: 12px;
  bottom: -40px;
  right: 10px;
}
</style>
