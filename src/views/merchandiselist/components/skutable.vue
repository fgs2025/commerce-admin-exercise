<template>
  <div>
    <el-table :data="props.row.sku" style="width: 100%" border class="skutable">
      <el-table-column label="商品图片" width="100" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.img"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="组合">
        <template slot-scope="props">
          <el-tag
            v-for="(item, index) in props.row.Composition"
            :key="index"
            class="zh"
            >{{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="价格" width="180"> </el-table-column>
      <el-table-column prop="stock" label="库存" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="skuInfo(props.row.id, scope.$index)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="removesku(props.row.id, scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="组合信息" :visible.sync="dialogFormVisible">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="图片">
            <el-image
              style="width: 100px; height: 100px"
              :src="form.img"
            ></el-image>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="form.rate"></el-input>
          </el-form-item>
          <el-form-item label="库存">
            <el-input v-model="form.stock"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changesku">确 定</el-button>
      </div>
    </el-dialog>
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
      },
      id: "",
      index: "",
      dialogFormVisible: false,
    };
  },
  computed: {
    List() {
      return this.$store.getters.getList;
    },
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
    skuInfo(id, index) {
      this.dialogFormVisible = true;
      this.id = id;
      this.index = index;
      this.List.filter((row) => row.id == id).forEach(
        (row) => (this.sku = row)
      );
      this.form.img = this.sku.sku[index].img;
      this.form.rate = this.sku.sku[index].rate;
      this.form.stock = this.sku.sku[index].stock;
    },
    changesku() {
      this.dialogFormVisible = false;
      this.$store.dispatch("spu/changesku", {
        id: this.id,
        index: this.index,
        form: this.form,
      });
      this.$message({
        message: "修改成功",
        type: "success",
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
