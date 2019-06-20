<template>
  <el-dialog
    title="通告更新"
    :visible.sync="editDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
     width="40%"
    top='10vh'
  >
    <el-form label-position="top" :rules="rules" status-icon :model="editNotice" ref="editNotice">
      <el-form-item label="通告标题" prop="title">
        <el-input type="text" v-model="editNotice.title" @focus="clear('title')"></el-input>
      </el-form-item>
      <el-form-item label="通告说明" prop="content">
        <el-input type="textarea" v-model="editNotice.content" @focus="clear('content')" maxlength="1000"
          show-word-limit
          :autosize="{minRows: 5,maxRows:5}"
          resize="none"></el-input>
      </el-form-item>
      <el-form-item label="通告类型">
        <el-select v-model="editNotice.type" filterable placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveInfo('editNotice')">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {editNoticeInfo} from '../../api/notices'
export default {
  name: "EditNotice",
  methods: {
    saveInfo(formName) {
      this.$confirm("确认保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let Info = this.editNotice;
          this.$refs[formName].validate(valid => {
            if (valid) {
              editNoticeInfo(Info).then((result) => {
                if(result.data.status===200){
                  this.$message.success(result.data.msg)
                  this.closeDialog()
                  this.$emit('currentChange',this.curpage)
                }
              })
            } else {
              this.$message.error("请填写正确信息");
            }
          });
        })
        .catch(() => {});
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["editNotice"].resetFields();
      });
      this.$emit("update:editDialog", false);
      this.$emit("update:editNotice", {});
    },
    clear(prop) {
      this.$refs["editNotice"].clearValidate(prop);
    }
  },
  data() {
    return {
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
      types: [
        {
          value: 2,
          label: "紧急通告"
        },
        {
          value: 1,
          label: "普通通告"
        },
       
      ]
    };
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    },
    editNotice: {
      type: Object
    },
    curpage: {
      type: Number
    }
  }
};
</script>

