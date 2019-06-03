<template>
  <el-dialog
    title="新增展品信息"
    :visible.sync="addDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form label-position="top" status-icon :model="newItemInfo" :rules="rules" ref="newItemInfo">
      <el-form-item label="展品名称" prop="name">
        <el-input v-model="newItemInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="展品文字说明" prop="info">
        <el-input type="textarea" v-model="newItemInfo.info" ></el-input>
      </el-form-item>
      <el-form-item label="图片名称" prop="imgName">
        <el-input v-model="newItemInfo.imgName"></el-input>
      </el-form-item>
      <el-form-item label="音频名称" prop="audioName">
        <el-input v-model="newItemInfo.audioName"></el-input>
      </el-form-item>
         <el-form-item label="展品类型"  required >
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
import { getUserInfoMessage } from "../../utils/localStorage";
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
      });
      this.newItemInfo.typeId = null;
      this.$emit("update:addDialog", false);
    },
    // 创建新的商品
    createItem(formName) {
      // 表单提交验证
      this.$refs[formName].validate(valid => {
        if (valid && this.newItemInfo.typeId !== null) {
          this.newItemInfo.operatorId = getUserInfoMessage("userInfo").id;
          let ItemInfo = this.newItemInfo;
          addItem(ItemInfo).then(result => {
            if (result.data.status === 200) {
              this.$message.success("添加成功");
              this.$refs["newItemInfo"].resetFields();
              this.$emit("update:addDialog", false);
              this.newItemInfo.typeId = null;
              this.$emit("getAllItem");
            }
            console.log(result);
          });
        }else{
            this.$message.error('请选择展品类型')
        }
      });
    }
  },
  data() {
    return {
      newItemInfo: {
        typeId: null,
        name: "",
        info: "",
        operatorId: null,
        audioName:'',
        imgName:''
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
      let info = result.data.info;
      let obj = { value: "" };
      for (let i in info) {
        obj.value = info[i].typeName;
        Object.assign(info[i], obj);
      }
      this.types = info;
    });
  }
};
</script>

<style scoped>
</style>
