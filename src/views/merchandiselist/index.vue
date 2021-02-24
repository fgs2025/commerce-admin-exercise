<template>
  <div class="merchandiselist-wrap">
    <search></search>
    <!-- <tab></tab> -->
    <div class="list">
      <el-table :data="List" style="width: 100%" border stripe>
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
            <el-button size="mini" @click="changespu(props.row.id)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="shanchu(props.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
        <div class="changebox">
          <el-form
            :model="Form"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品名称" prop="title">
              <el-input v-model="Form.title"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="type" class="fenlei">
              <el-select
                v-model="Form.type"
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

            <el-form-item label="商品图片" class="img">
              <el-image
                style="width: 100px; height: 100px;margin-right: 20px;"
                :src="item"
                
                v-for="(item, index) in Form.img"
                :key="index"
              >
              </el-image>
              <input type="file" ref="img" class="file" />
            </el-form-item>

            <el-form-item label="商品详情" prop="details">
              <el-input type="textarea" v-model="Form.details"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
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
import addClass from "../classification/components/addClass.vue";
export default {
  data() {
    return {
      Form: {
        title: "",
        type: "",
        img: [],
        details: "",
      },
      dialogFormVisible: false,
    };
  },
  computed: {
    List() {
      return this.$store.getters.getList;
    },
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
    changespu(id) {
      this.dialogFormVisible = true;
      let box = this.List.filter((row) => row.id == id);
      box.forEach((el) => {
        this.aaa = el;
      });
      this.Form.title = this.aaa.title;
      this.Form.type = this.aaa.type;
      this.Form.img = this.aaa.img;
      this.Form.details = this.aaa.details;
    },
  },
  components: {
    search,
    // Tab,
    Addspec,
    Spectable,
    Skutable,
    Addsku,
    addClass,
  },
};
</script>

<style lang="less">
.changebox {
  .el-form-item__content {
    display: flex;
  }
  .addclass {
    margin-left: 20px;
  }
  .img {
    img {
      & + img {
        margin-left: 10px;
      }
    }
    .file {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
