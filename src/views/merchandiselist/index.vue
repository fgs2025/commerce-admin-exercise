<template>
  <div class="merchandiselist-wrap">
    <search></search>
    <!-- <tab></tab> -->
    <div class="list">
      <el-table :data="List" style="width: 100%" border stripe >
        <el-table-column prop="id" label="商品ID" width="80" align="center">
        </el-table-column>
        <el-table-column prop="type" label="商品类别" width="80" align="center">
        </el-table-column>
        <el-table-column label="商品图片" width="100" align="center">
          <template slot-scope="scope">
            <el-image
              :src="ImgUrl(scope.row)"
              :preview-src-list="scope.row.img"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="details"
          label="描述"
          width="300"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="规格/库存" type="expand" width="150">
          <template slot-scope="props">          
            <addspec :props="props"></addspec>
            <spectable :props="props"></spectable>
            <addsku :props="props"></addsku>
            <skutable :props="props"></skutable>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger" @click="shanchu(props.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Addsku from "./components/addsku.vue";
import Addspec from "./components/addspec.vue";
import search from "./components/search.vue";
import Skutable from "./components/skutable.vue";
import Spectable from "./components/spectable.vue";
// import Tab from "./components/tab.vue";
export default {
  data() {
    return {};
  },
  computed: {
    List() {
      return this.$store.getters.getList;
    },
  },
  methods: {
    ImgUrl(row) {
      return row.img[0];
    },
    shanchu(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("spu/remove", id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: { search, 
  // Tab,
   Addspec, Spectable, Skutable, Addsku },
};
</script>

<style lang="less" scoped>

</style>