<template>
  <div>
    <div class="moduleTitle">
      <i class="el-icon-document-add"></i>
      新文章
    </div>
    <el-form :inline="true" :model="addForm" class="demo-form-inline" :rules="rules" ref="addForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="addForm.title" @focus="clear('title')"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="addForm.author"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="addForm.source"></el-input>
      </el-form-item>
      <el-form-item label="是否发布:" style="margin-right:20%;">
        <el-switch
          v-model="addForm.status"
          class="demo"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
          active-text="发布"
          inactive-text="不发布"
          @change="openArticle"
        ></el-switch>
      </el-form-item>
      <el-form-item label="文章类型" prop="essayType">
        <el-select v-model="addForm.essayType" placeholder="请选择" @focus="clear('essayType')">
          <el-option
            v-for="item in types"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动态类型" v-if="addForm.essayType==1">
        <el-select v-model="addForm.dynamicType" placeholder="请选择" @focus="clear('dynamicType')">
          <el-option
            v-for="item in dytypes"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入者" prop="inputer">
        <el-input v-model="addForm.inputer" @focus="clear('inputer')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createArt('addForm')" size="small">创建</el-button>
      </el-form-item>
    </el-form>
    <self-editor v-model="addForm.content" :uploadUrl="uploadUrl"></self-editor>
  </div>
</template>

<script>
import SelfEditor from "./SelfEditor";
import { getUserInfoMessage } from "../../utils/localStorage";
import { creArt } from "../../api/article";
export default {
  name: "CreateArt",
  inject: ["reload"],
  data() {
    return {
      uploadUrl: "http://upload.qiniup.com",
      addForm: {
        content: "",
        title: "",
        author: "",
        source: "",
        essayType: "",
        inputer: "",
        dynamicType: null,
        operatorId: null,
        views: 0,
        status: 0
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        essayType: [
          { required: true, message: "请选择文章类型", trigger: "blur" }
        ],
        inputer: [
          { required: true, message: "请输入录入者名称", trigger: "blur" }
        ]
      },
      value: "",
      types: [
        {
          value: 1,
          label: "本馆动态"
        },
        {
          value: 2,
          label: "博物馆文化"
        }
      ],
      dytypes: [
        {
          value: 1,
          label: "紧急动态"
        },
        {
          value: 2,
          label: "普通动态"
        }
      ]
    };
  },
  methods: {
    createArt(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.addForm.content !== "") {
          let form = this.addForm;
          creArt(form).then(result => {
            this.$message.success("创建成功");
            this.$refs[formName].resetFields();
            this.reload();
            this.$router.push("/allarticle");
          });
        } else {
          this.$message.error("不符合创建要求");
        }
      });
    },
    openArticle(val) {
      this.addForm.status = val;
    },
    clear(prop) {
      this.$refs["addForm"].clearValidate(prop);
    }
  },
  created() {
    this.addForm.operatorId = getUserInfoMessage("userInfo").id;
  },
  components: {
    SelfEditor
  }
};
</script>

