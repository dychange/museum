<template>
  <el-dialog
    title="管理员更新"
    :visible.sync="editDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form label-position="top" :rules="rules" status-icon :model="editInfo" ref='editInfo'>
      <el-form-item label="账号类型">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="editInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input type="password" v-model="editInfo.checkpass"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveInfo('editInfo')">保存</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {updateInfo} from '../../api/adminList'
export default {
  name: "AdminEdit",
  methods: {
    saveInfo(formName) {
      let Info={
        id:this.id,
        memberAccountTypeId:this.value,
        password:this.editInfo.password
      }
      if(Info.password===''){
        Info.password=null
      }
      updateInfo(Info).then((result) => {
        if(result.data.status===200){
          this.$message.success(result.data.msg)
          this.$emit("update:editDialog", false);
          this.$emit('getAdminList')
          this.$refs[formName].resetFields();
          console.log(result)
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    closeDialog() {
      this.$emit("update:editDialog", false);
    }
  },
  data() {
    const validatePass2 = (rule, val, callback) => {
      if (val !== this.editInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        password: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "change"
          }
        ],
        checkpass: [{ validator: validatePass2, trigger: "change" }]
      },
      value: null,
      types: [
        {
          value: 1,
          label: "超级管理员"
        },
        {
          value: 2,
          label: "管理员"
        },
        {
          value: 3,
          label: "客服"
        }
      ],
      editInfo: {
        password: null,
        checkpass: null
      }
    };
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  }
};
</script>

<style scoped>
</style>
