<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>预警管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--serach-->
    <div class="oa_search">
      <el-input class="chaxun" v-model="query" placeholder="全文搜索"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="chaxun">查询</el-button>
      <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleGoUrl">新增预警</el-button>
    </div>
    <!--list-->
    <el-table
      :data="qiefendataTable"
      stripe
      border
      style="width: 100%"
      :default-sort="{prop: 'starttime', order: 'descending'}"
    >
      <el-table-column sortable prop="biaoti" label="预警标题" align="center" min-width="200"></el-table-column>
      <el-table-column sortable prop="nigaoren" label="发起人" align="center" width="120"></el-table-column>
      <el-table-column sortable prop="jinji" align="center" width="120" label="预警程度"></el-table-column>
      <el-table-column sortable prop="zhuangtai" align="center" width="120" label="状态">
        <template slot-scope="scope">
          <a v-if="scope.row.zhuangtai=='预警未开始'" style="color:#0066CC">{{scope.row.zhuangtai}}</a>
          <a v-if="scope.row.zhuangtai=='未处理'" style="color:#FF0000">{{scope.row.zhuangtai}}</a>
          <a v-if="scope.row.zhuangtai=='处理完成'" style="color:#00BB00">{{scope.row.zhuangtai}}</a>
        </template>
      </el-table-column>
      <el-table-column sortable prop="wanchengren" align="center" width="120" label="处理人"></el-table-column>
      <el-table-column sortable prop="wanchengtime" align="center" width="120" label="处理时间"></el-table-column>
      <el-table-column sortable prop="starttime" align="center" label="预警开始" width="120"></el-table-column>
      <el-table-column sortable prop="endtime" align="center" label="预警结束" width="120"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)" size="small">
            <i class="iconfont icon-search"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pailei">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="dataTable.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import * as API from "@/api";
export default {
  mounted() {
    API.getfasongguanli({
      token: localStorage.getItem("token"),
      doctype: "yujing",
      query: this.query
    }).then(({ data }) => {
      this.dataTable = data.dataTable;
      this.qiefendataTable = this.dataTable.slice(0, 20);
    });
  },
  data() {
    return {
      dataTable: [],
      qiefendataTable: [],
      query: ""
    };
  },
  methods: {
    handleGoUrl() {
      this.$router.push({ path: "/bangongguanli/yujing" });
    },
    chaxun() {
      API.getfasongguanli({
        token: localStorage.getItem("token"),
        doctype: "yujing",
        query: this.query
      }).then(({ data }) => {
        this.dataTable = data.dataTable;
        this.qiefendataTable = this.dataTable.slice(0, 20);
      });
    },
    handleCurrentChange(val) {
      this.qiefendataTable = this.dataTable.slice(20 * val - 20, val * 20);
    },
    handleEdit(index, row) {
      console.log(row);
      this.$router.push({
        path: "/bangongguanli/yujing",
        query: {
          wendangid: row.wendangid
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.oa_search {
  margin-top: 30px;
  background: #efefef;
}
.chaxun {
  width: 400px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
