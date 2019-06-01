<template>
  <el-dialog
    title="新增展品信息"
    :visible.sync="addDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form
      label-position="top"
      status-icon
      :model="newItemInfo"
      :rules="rules"
      ref="newItemInfo"
    >
      <el-form-item label="帐号" prop="userName">
        <el-input v-model="newItemInfo.userName" @focus="clear"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="telephone">
        <el-input type="text" v-model="newItemInfo.telephone" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="newItemInfo.password" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpass">
        <el-input type="password" v-model="newItemInfo.checkpass" ></el-input>
      </el-form-item>
      <el-form-item label="账号类型" required>
        <el-select v-model="newItemInfo.memberAccountTypeId" placeholder="请选择">
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
      <el-button type="primary" @click="createItem('newItemInfo')">创建</el-button>
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AddItem",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["newItemInfo"].resetFields();
        this.newItemInfo.memberAccountTypeId = "";
      });
      this.$emit("update:addDialog", false);
    },
    // 创建新的管理员
    createItem(formName) {
      // 表单提交验证
      this.$refs[formName].validate(valid => {
        if (valid && this.newItemInfo.memberAccountTypeId != undefined) {
          let ItemInfo = this.newItemInfo;
        }
      });
    },
    clear(){
      this.$refs["newItemInfo"].clearValidate()
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
    return {
      newItemInfo: {
        userName: "",
        password: "",
        telephone: null,
        memberAccountTypeId: this.value,
        checkpass: ""
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: "^[a-zA-Z0-9]",
            message: "只能由英文,数字组成",
            trigger: "blur"
          },
          {
            max: 18,
            message: "最大只能18位",
            trigger: "blur"
          }
        ],
        telephone: [
          {
            pattern: "^[^ ]+$",
            message: "不能有空格",
            trigger: "blur"
          },
          {
            pattern: "^[0-9]",
            message: "只能由数字组成",
            trigger: "blur"
          },
          {
            required: true,
            message: "联系方式不能为空",
            trigger: "blur"
          },
          {
            max: 11,
            message: "最大只能11位",
            trigger: "blur"
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
            trigger: "blur"
          },
          {
            max: 18,
            message: "最大只能18位密码",
            trigger: "blur"
          }
        ],
        checkpass: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
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
