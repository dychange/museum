<template>
  <el-dialog
    title="新增管理员信息"
    :visible.sync="addDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form
      label-position="top"
      status-icon
      :model="newAdminInfo"
      :rules="rules"
      ref="newAdminInfo"
    >
      <el-form-item label="帐号" prop="userName">
        <el-input v-model="newAdminInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="账号类型" required>
        <el-select v-model="newAdminInfo.memberAccountTypeId" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="newAdminInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input type="password" v-model="newAdminInfo.checkpass"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createAdmin('newAdminInfo')">创建</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addAdmin ,checkName} from '../../api/adminList'
export default {
  name: "Add",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:addDialog", false);
    },
    createAdmin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.newAdminInfo.memberAccountTypeId != undefined) {
          let AdminInfo=this.newAdminInfo
          addAdmin(AdminInfo).then((result) => {
            if(result.data.status===200){
              this.$message.success('创建成功')
              this.$emit('getAdminList')
              this.$refs[formName].resetFields();
          this.$emit("update:addDialog", false);
            }else{
              this.exist=true
              this.errmsg=result.data.msg
            }
            console.log(result)
          }).catch((err) => {
            console.log(err)
          });
        } else {
          this.$message.error("请填写正确信息");
        }
      });
    }
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.newAdminInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkUser = (rule, value, callback) => {
        let userName=value
        checkName({userName}).then((result) => {
          if(result.data.status === 400){
            callback(new Error(result.data.msg))
          }
          console.log(result)
          callback()
        }).catch((err) => {
          console.log(err)
        });
      };
    return {
      newAdminInfo: {
        userName: "",
        password: "",
        memberAccountTypeId: this.value,
        checkpass: ""
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: "^[a-zA-Z0-9]",
            message: "只能由英文,数字组成",
            trigger: "change"
          },{
            validator:checkUser, trigger:'blur'
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "change"
          }
        ],
        checkpass: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "change"
          },
          { validator: validatePass2, trigger: "change" }
        ]
      },
      value: "",
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
      ]
    };
  }
};
</script>

<style scoped>
</style>
