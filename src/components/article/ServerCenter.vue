<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-chat-dot-round"></i>
      服务中心
    </div>
    <div class="form">
      <el-form ref="serverForm" :model="serverForm" label-width="80px" :rules="rules">
        <el-form-item label="成人票价" prop="adultPrice">
          <el-input
            v-model="serverForm.adultPrice"
            @focus="clear('adultPrice')"
            placeholder="请输入数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠票价" prop="discountPrice">
          <el-input
            v-model="serverForm.discountPrice"
            @focus="clear('discountPrice')"
            placeholder="请输入数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="交通" prop="traffic">
          <el-input v-model="serverForm.traffic" @focus="clear('traffic')"></el-input>
        </el-form-item>
        <el-form-item label="开放时间" prop="openingHours">
          <el-input v-model="serverForm.openingHours" @focus="clear('openingHours')"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="serverForm.telephone" @focus="clear('telephone')"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="serverForm.email" @focus="clear('email')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="save('serverForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { editServer, getServer } from "../../api/article";
export default {
  name: "ServerCenter",
  data() {
    return {
      serverForm: {},
      rules: {
        adultPrice: [
          { required: true, message: "请输入价格", trigger: "blur" }
        ],
        discountPrice: [
          { required: true, message: "请输入价格", trigger: "blur" }
        ],
        traffic: [
          { required: true, message: "请输入交通路线", trigger: "blur" }
        ],
        openingHours: [
          { required: true, message: "请输入开放时间", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      }
    };
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let form = this.serverForm;
          editServer(form).then(result => {
            if (result.data.status === 200) {
              this.$message.success("保存成功");
              this.$refs["serverForm"].clearValidate();
            }
          });
        } else {
          this.$message.error("不能为空");
        }
      });
    },
    clear(prop) {
      this.$refs["serverForm"].clearValidate(prop);
    }
  },
  created() {
    getServer().then(result => {
      if (result.data.status === 200) {
        this.serverForm = result.data.info;
      }
    });
  }
};
</script>


<style scoped>
.form {
  padding: 5% 30%;
}
</style>
