<template>
  <div class="merchandiselist-wrap">
    <div class="search-box">
      <el-input v-model="input" placeholder="请输入商品名称"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="list">
      <el-table :data="searchData" style="width: 100%" border stripe>
        <el-table-column
          prop="id"
          label="商品ID"
          width="100"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="商品类别"
          width="120"
          align="center"
          sortable
        >
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
            <p class="row">规格信息</p>
            <addspec :props="props"></addspec>
            <spectable :props="props"></spectable>
            <p class="row">组合/库存</p>
            <addsku :props="props"></addsku>
            <skutable :props="props"></skutable>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button size="mini" @click="spuInfo(props.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="removespu(props.row.id)"
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
                  v-for="(item, index) in Tab"
                  :key="index"
                ></el-option>
              </el-select>
              <add-class class="addclass"></add-class>
            </el-form-item>

            <el-form-item label="商品图片" class="img">
              <div
                class="img-box"
                v-for="(item, index) in Form.img"
                :key="index"
              >
                <img :src="item" alt="" />
                <div class="show">
                  <i
                    class="el-icon-zoom-in"
                    @click="handlePictureCardPreview(item)"
                  ></i>
                  <i class="el-icon-delete" @click="removeimg(index)"></i>
                </div>
              </div>

              <el-upload
                action=""
                list-type="picture-card"
                :before-upload="beforeUpload"
                multiple
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>

            <el-form-item label="商品详情" prop="details">
              <el-input type="textarea" v-model="Form.details"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changespu">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Addsku from "./components/addsku.vue";
import Addspec from "./components/addspec.vue";
import Skutable from "./components/skutable.vue";
import Spectable from "./components/spectable.vue";
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
      id: "",
      input: "",
      searchData: [],
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.searchData = this.$store.getters.getList;
  },
  computed: {
    Tab() {
      return this.$store.getters.getTab;
    },
  },

  methods: {
    ImgUrl(row) {
      return row.img[0];
    },
    removespu(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("spu/remove", id);
          this.input = "";
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
    spuInfo(id) {
      this.dialogFormVisible = true;
      this.id = id;
      let info = this.searchData.filter((row) => row.id == this.id);
      this.infos=info[0]
      let obj = JSON.parse(JSON.stringify(this.infos));
      this.Form.title = obj.title;
      this.Form.type = obj.type;
      this.Form.img = obj.img;
      this.Form.details = obj.details;
    },
    changespu() {
      this.dialogFormVisible = false;
      this.$store.dispatch("spu/changespu", { id: this.id, form: this.Form });
      this.$message({
        message: "修改成功",
        type: "success",
      });
    },
    search() {
      let aaa = [];
      this.$store.getters.getList.forEach((row) => {
        if (row.title.indexOf(this.input) >= 0) {
          aaa.push(row);
        }
      });
      this.searchData = aaa;
    },
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      this.Form.img.push(URL.createObjectURL(file));
      return false;
    },
    removeimg(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Form.img.splice(index, 1);
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
  watch: {
    input(val) {
      if (!val) {
        this.searchData = this.$store.getters.getList;
      }
    },
  },
  components: {
    Addspec,
    Spectable,
    Skutable,
    Addsku,
    addClass,
  },
};
</script>

<style lang="less">
.search-box {
  width: 800px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 40px;
}
.changebox {
  .el-form-item__content {
    display: flex;
  }
  .addclass {
    margin-left: 20px;
  }
  .img {
    .img-box {
      width: 148px;
      height: 148px;
      margin-right: 10px;
      position: relative;
      img {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .show {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transform: all 1s;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          font-size: 25px;
          cursor: pointer;
          color: #fff;
          & + i {
            margin-left: 20px;
          }
        }
      }
      &:hover .show {
        opacity: 1;
        transform: all 1s;
      }
    }
    .file {
      height: 40px;
      line-height: 40px;
    }
  }
}
.row {
  margin: 5px 0;
  font-size: 15px;
  font-weight: 800;
}
</style>
