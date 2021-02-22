<template>
  <div>
    <div class="title">添加商品</div>
    <div class="add-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="type" class="fenlei">
          <el-select
            v-model="ruleForm.type"
            placeholder="请选择分类"
            clearable
            filterable
          >
            <el-option
              :label="item.title"
              :value="item.title"
              v-for="(item, index) in Tabs"
              :key="index"
            ></el-option>
          </el-select>
          <add-class class="addclass"></add-class>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            action="/merchandiseAdd"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileLists"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品详情" prop="details">
          <el-input type="textarea" v-model="ruleForm.details"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addspu('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import addClass from "../classification/components/addClass.vue";
export default {
  components: { addClass },
  data() {
    return {
      ruleForm: {
        id: "",
        title: "",
        img: [],
        type: "",
        details: "",
        specsList: [],
        sku: [],
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择分类", trigger: "change" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      fileLists: [],
    };
  },
  computed: {
    Tab() {
      return this.$store.getters.getTab;
    },
    total() {
      return this.Tabs.length;
    },
    Tabs() {
      return this.Tab.slice(1, this.Tab.length);
    },
  },
  methods: {
    addspu(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("spu/addspu", this.ruleForm);
          this.$message({
            message: "添加成功",
            type: "success",
          });
          // this.ruleForm = {
          //   id: "",
          //   title: "",
          //   img: [],
          //   type: "",
          //   details: "",
          //   specsList: [],
          //   sku: [],
          // };
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scope>
.title {
  font-size: 30px;
  text-align: center;
}
.add-box {
  width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  // border: 1px solid red;
  .el-form-item__content {
    display: flex;
  }
  .addclass {
    margin-left: 20px;
  }
}
</style>
