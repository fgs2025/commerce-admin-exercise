<template>
  <div class="search-box">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary">搜索</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style lang="less" scoped>
 .search-box {
    width: 800px;
    display: flex;
    margin: 0 auto;
  }
</style>