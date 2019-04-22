<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>文档管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div v-if="quanxian==60||quanxian==28">
      <div class="chaxun">
        <el-input
          class="chaxun1"
          size="medium"
          v-model="wendangid"
          placeholder="请输入文档编号"
          @keyup.enter.native="chaxun"
        ></el-input>
        <el-button size="medium" type="primary" @click="chaxun">查询</el-button>
      </div>
      <el-table
        border
        :data="dataTable"
        stripe
        style="width: 100%"
        :default-sort="{prop: 'laiwentime', order: 'descending'}"
      >
        <el-table-column
          sortable
          prop="biaoti"
          align="center"
          label="标题"
          show-overflow-tooltip
          min-width="200"
        ></el-table-column>
        <el-table-column
          sortable
          prop="nigaoren"
          align="center"
          label="发文人"
          show-overflow-tooltip
          width="108"
        ></el-table-column>
        <el-table-column
          sortable
          prop="starttime"
          align="center"
          label="发文时间"
          show-overflow-tooltip
          width="108"
        ></el-table-column>
        <el-table-column fixed="right" align="center" width="160" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as API from "@/api";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  mounted() {
    var userdata = JSON.parse(localStorage.getItem("userdata"));
    this.quanxian = userdata.quanxian;
  },
  data() {
    return {
      wendangid: "",
      quanxian: 0,
      dataTable: []
    };
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm("确认删除文档?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.shanchuwendang({
          token: localStorage.getItem("token"),
          wendangid: row.wendangid
        }).then(({ data }) => {
          if (data.MSG == "YES") {
            this.$message.success({
              showClose: true,
              message: "删除文档成功！",
              duration: 2000
            });
            this.dataTable = [];
          }
        });
      });
    },
    chaxun() {
      if (this.wendangid.length == 0) {
        this.$message({
          showClose: true,
          message: "文档编号不能为空",
          duration: 3000
        });
        return "";
      }
      API.chaxunwendang({
        token: localStorage.getItem("token"),
        wendangid: this.wendangid
      }).then(({ data }) => {
        if (data.MSG == "NO") {
          this.$message({
            showClose: true,
            message: "当前文档编号不存在",
            duration: 3000
          });
        } else {
          this.dataTable = data.dataTable;
        }
      });
    },
    handleEdit(index, row) {
      if (row.doctype == "duban") {
        this.$router.push({
          path: "/bangongguanli/duban",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "huiyifaqi") {
        this.$router.push({
          path: "/bangongguanli/huiyifaqi",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "youjian") {
        this.$router.push({
          path: "/person/fasongyoujian",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "yujing") {
        this.$router.push({
          path: "/bangongguanli/yujing",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "gonggao") {
        this.$router.push({
          path: "/bangongguanli/gonggao",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "shouwen") {
        this.$router.push({
          path: "/shouwen/shouwendengji",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "gongwen") {
        this.$router.push({
          path: "/fawen/gongwen",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "fawen") {
        this.$router.push({
          path: "/fawen/fawen",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "huiyi") {
        this.$router.push({
          path: "/fawen/huiyi",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "dangwu") {
        this.$router.push({
          path: "/fawen/dangwu",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "dangwuhuiyi") {
        this.$router.push({
          path: "/fawen/dangwuhuiyi",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "qianbao") {
        this.$router.push({
          path: "/fawen/qianbao",
          query: {
            wendangid: row.wendangid
          }
        });
      } else if (row.doctype == "yian") {
        this.$router.push({
          path: "/fawen/yian",
          query: {
            wendangid: row.wendangid
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.caogao {
  margin-top: 10px;
  margin-bottom: 10px;
}

.chaxun {
  height: 40px;
  line-height: 40px;
  background: #efefef;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  display: block;
  .chaxun1 {
    width: 300px;
  }
}
</style>
