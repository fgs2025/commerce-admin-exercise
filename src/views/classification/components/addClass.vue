<template>
  <div class="btn-box">
    <el-button type="primary" @click="addClass">添加分类</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    addClass() {
      this.$prompt("请输入要添加的分类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空",
      })
        .then(({ value }) => {
          this.$store.dispatch("classify/setClass", { title: value });
          this.$message({
            type: "success",
            message: "添加成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.btn-box {
  margin-bottom: 20px;
}
</style>