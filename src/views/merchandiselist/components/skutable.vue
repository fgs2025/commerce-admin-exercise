<template>
  <el-table :data="props.row.sku" style="width: 100%" border class="skutable">
    <el-table-column label="商品图片" width="100" align="center">
      <template slot-scope="scope">
        <el-image :src="scope.row.img"></el-image>
      </template>
    </el-table-column>
    <el-table-column label="组合">
      <template slot-scope="props">
        <span
          v-for="(item, index) in props.row.Composition"
          :key="index"
          class="zh"
          >{{ item }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="rate" label="价格" width="180"> </el-table-column>
    <el-table-column prop="stock" label="库存" width="180"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="removesku(props.row.id, scope.$index)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["props"],
  data() {
    return {};
  },
  methods: {
    removesku(id, index) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("spu/removesku", { id, index });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.skutable {
  margin-top: 10px;
}
.zh {
  margin-right: 10px;
}
</style>