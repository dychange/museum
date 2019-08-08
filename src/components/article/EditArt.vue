<template>
  <el-dialog
    title="修改文章"
    :visible.sync="editDialog"
    :modal-append-to-body="false"
    :before-close="closeDialog"
    :close-on-click-modal="false"
    top="2vh"
    width="80%"
  >
    <el-form
      :inline="true"
      :model="editInfo"
      class="demo-form-inline"
      :rules="rules"
      ref="editInfo"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="editInfo.title" @focus="clear('title')"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="editInfo.author"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="editInfo.source"></el-input>
      </el-form-item>
      <el-form-item label="文章类型" prop="essayType">
        <el-select v-model="editInfo.essayType" placeholder="请选择" @focus="clear('essayType')">
          <el-option
            v-for="item in types"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动态类型" v-if="editInfo.essayType==1">
        <el-select v-model="editInfo.dynamicType" placeholder="请选择" @focus="clear('dynamicType')">
          <el-option
            v-for="item in dytypes"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入者" prop="inputer">
        <el-input v-model="editInfo.inputer" @focus="clear('inputer')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveArt('editInfo')" size="small">保存</el-button>
      </el-form-item>
    </el-form>
    <self-editor
      v-model="editInfo.content"
      :uploadUrl="uploadUrl"
      :editContent="editInfo.content"
    ></self-editor>
  </el-dialog>
</template>

<script>
import SelfEditor from "./SelfEditor";
import { editArt } from "../../api/article";
import {getDomain} from '../../api/qiniu'
export default {
  name: "EditArt",
  methods: {
    saveArt(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.editInfo.content !== "") {
          let form = this.editInfo;
          editArt(form).then(result => {
            if (result.data.status === 200) {
              this.$message.success(result.data.msg);
              this.$emit("currentChange", this.curpage);
              this.closeDialog();
            }
          });
        } else {
          this.$message.error("不符合创建要求");
        }
      });
    },
    clear(prop) {
      this.$refs["editInfo"].clearValidate(prop);
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs["editInfo"].resetFields();
      });
      this.$emit("update:editDialog", false);
    }
  },
  created() {
    getDomain().then((result) => {
      if(result.data.status===200){
        this.domain=result.data.info
      }
    })
  },
  data() {
    return {
      uploadUrl: "http://upload.qiniup.com",
      domain: '',
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
  components: {
    SelfEditor
  },
  props: {
    editDialog: {
      type: Boolean,
      default: false
    },
    editInfo: {
      type: Object
    },
    curpage: {
      type: Number
    }
  }
};
</script>

