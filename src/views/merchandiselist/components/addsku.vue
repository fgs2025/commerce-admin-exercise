<template>
  <div class="addsku">
    <div class="img-box" v-if="form.img != ''">
      <img :src="form.img" alt="" />
      <div class="img-show">
        <i class="el-icon-zoom-in" @click="handlePictureCardPreview()"></i>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-select
      v-for="(item, index) in props.row.specsList"
      clearable
      v-model="form.Composition[index]"
      :placeholder="item.title"
      :key="index"
      filterable
    >
      <el-option
        v-for="(ite, inde) in item.spec"
        :key="inde"
        :label="ite"
        :value="ite"
      >
      </el-option>
    </el-select>
    <el-input v-model="form.rate" placeholder="请输入价格"></el-input>
    <el-input v-model="form.stock" placeholder="请输入库存"></el-input>
    <el-upload
      action=""
      list-type="picture"
      multiple
      :before-upload="beforeUpload"
    >
      <el-button type="primary">上传图片</el-button>
    </el-upload>
    <el-button type="primary" @click="add(props.row.id)" class="add-btn"
      >添加组合</el-button
    >
  </div>
</template>

<script>
export default {
  props: ["props"],
  data() {
    return {
      form: {
        img: "",
        rate: "",
        stock: "",
        Composition: [],
      },
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },

  methods: {
    add(id) {
      if (
        this.form.Composition.length > 0 &&
        this.form.rate != "" &&
        this.form.stock != ""
      ) {
        this.$store.dispatch("spu/addsku", { form: this.form, id: id });
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.form.img = "";
        this.form.rate = "";
        this.form.stock = "";
        this.form.Composition = [];
      } else {
        this.$message({
          message: "请查看数据是否填写",
          type: "warning",
        });
      }
    },
    beforeUpload(file) {
      this.form.img = URL.createObjectURL(file);
      return false;
    },
    handlePictureCardPreview() {
      this.dialogVisible = true;
      this.dialogImageUrl = this.form.img;
    },
  },
};
</script>

<style lang="less" scoped>
.addsku {
  // margin-top: 10px;
  display: flex;
  align-items: center;
  .el-select {
    margin-right: 20px;
  }
  .el-input {
    width: 130px;
    margin-right: 20px;
  }
  .add-btn {
    margin-left: 10px;
  }
  .img-box {
    width: 50px;
    height: 50px;
    position: relative;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
    .img-show {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5s);
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 20px;
        color: #fff;
        cursor: pointer;
      }
    }
    &:hover .img-show {
      opacity: 1;
    }
  }
}
</style>
