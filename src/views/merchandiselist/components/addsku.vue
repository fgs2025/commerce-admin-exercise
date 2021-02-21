<template>
  <div class="addsku">
    <el-select
      v-for="(item, index) in props.row.specsList"
      clearable
      v-model="form.Composition[index]"
      :placeholder="item.title"
      :key="index"
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
    <el-button type="primary" size="mini" @click="add(props.row.id)"
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
  },
};
</script>

<style lang="less" scoped>
.addsku {
  margin-top: 10px;
  display: flex;
  .el-select {
    margin-right: 20px;
  }
  .el-input {
    width: 130px;
    margin-right: 20px;
  }
}
</style>