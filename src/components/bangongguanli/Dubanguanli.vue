<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>督办管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--serach-->
    <div class="oa_search">
      <el-input class="chaxun" v-model="query" placeholder="全文搜索"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="chaxun">查询</el-button>
      <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleGoUrl">新增督办</el-button>
    </div>
    <div class="chaxun">
      标题颜色说明：
      <a style="color: #00BB00">已完成</a>
      <a style="color: #FF0000">未完成</a>
    </div>
    <!--list-->
    <el-table :data="qiefendataTable" stripe border style="width: 100%">
      <el-table-column sortable prop="biaoti" label="交办事项" align="center" min-width="200">
        <template slot-scope="scope">
              <a
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              >{{scope.row.biaoti}}</a>
</template>
      </el-table-column>
      <el-table-column sortable prop="nigaoren" label="发起人" align="center" width="120"></el-table-column>
      <el-table-column sortable prop="starttime" align="center" width="120" label="发起时间"></el-table-column>
      <el-table-column sortable prop="jinji" align="center" width="120" label="督办类型"></el-table-column>
      <el-table-column sortable prop="zhuangtai" align="center" width="120" label="状态">
<template slot-scope="scope">
  <a v-if="scope.row.zhuangtai!='已完成'" style="color:#FF0000">{{scope.row.zhuangtai}}</a>
  <a v-else style="color:#00BB00">{{scope.row.zhuangtai}}</a>
</template>
      </el-table-column>
      <el-table-column sortable prop="endtime" align="center" width="120" label="完成时间"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="120">
<template slot-scope="scope">
  <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
    查看</el-button>
</template>
      </el-table-column>
    </el-table>
    <div class="pailei">
      <el-pagination
        v-if="pageshow"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
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
  import * as API from '@/api';
  export default {
    created() {
      API.getjieshouguanli({
        token: localStorage.getItem('token'),
        doctype: 'duban',
        query: this.query
      }).then(({
        data
      }) => {
        this.dataTable = data.dataTable;
        this.qiefendataTable = this.dataTable.slice(0, 20);
      });
    },
    activated() {
      var qiangzhishuaxin = localStorage.getItem('qiangzhishuaxin');
      localStorage.setItem('qiangzhishuaxin', 0);
      if (qiangzhishuaxin == 1) {
        this.pageshow = false;
        API.getjieshouguanli({
          token: localStorage.getItem('token'),
          doctype: 'duban',
          query: this.query
        }).then(({
          data
        }) => {
          this.dataTable = data.dataTable;
          this.qiefendataTable = this.dataTable.slice(0, 20);
        });
        this.currentPage = 1;
        this.pageshow = true;
      }
    },
    data() {
      return {
        dataTable: [],
        qiefendataTable: [],
        query: '',
        pageshow: true,
        currentPage: 1,
      };
    },
    methods: {
      handleGoUrl() {
        this.$router.push({
          path: '/bangongguanli/duban'
        });
      },
      chaxun() {
        API.getjieshouguanli({
          token: localStorage.getItem('token'),
          doctype: 'duban',
          query: this.query
        }).then(({
          data
        }) => {
          this.dataTable = data.dataTable;
          this.qiefendataTable = this.dataTable.slice(0, 20);
        });
      },
      handleCurrentChange(val) {
        this.qiefendataTable = this.dataTable.slice(20 * val - 20, val * 20);
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/bangongguanli/duban',
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
