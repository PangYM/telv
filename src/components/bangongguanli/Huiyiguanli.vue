<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>会议管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--serach-->
    <div class="oa_search">
      <el-input class="chaxun" v-model="query" placeholder="全文搜索"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="chaxun">查询</el-button>
      <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleGoUrl">新增会议</el-button>
    </div>
    <!--list-->
    <el-table
      :data="qiefendataTable"
      stripe
      border
      style="width: 100%" :default-sort = "{prop: 'starttime', order: 'descending'}">
      <el-table-column
        sortable
        prop="biaoti"
        label="会议主题"
        align="center"
        min-width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="nigaoren"
        label="发起人"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="didian"
        align="center"
        width="120"
        label="会议地点">
      </el-table-column>
      <el-table-column
        sortable
        prop="riqi"
        align="center"
        width="120"
        label="会议日期">
      </el-table-column>
      <el-table-column
        sortable
        prop="zhuangtai"
        align="center"
        width="120"
        label="状态">
      </el-table-column>
      <el-table-column
        sortable
        prop="starttime"
        align="center"
        label="开始时间"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="endtime"
        align="center"
        label="结束时间"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)" size="small"><i class="iconfont icon-search"></i></el-button>
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
  :total="dataTable.length">
</el-pagination>
</div>
  </div>
</template>
<script>
import * as API from '@/api';
export default {
  created() {
      API.getjieshouguanli({
        'token': localStorage.getItem('token'),
        'doctype': 'huiyifaqi',
        'query':this.query,
      }).then(({
        data
      }) => {
        this.dataTable = data.dataTable;
        this.qiefendataTable=this.dataTable.slice(0,20);
      });
    },
  data() {
    return {
      dataTable: [],
      qiefendataTable:[],
      query:'',
    };
  },
  methods: {
    handleGoUrl() {
      this.$router.push({ path: '/bangongguanli/huiyifaqi' });
    },
    chaxun(){
        API.getjieshouguanli({
        'token': localStorage.getItem('token'),
        'doctype': 'huiyifaqi',
        'query':this.query,
      }).then(({
        data
      }) => {
        this.dataTable = data.dataTable;
        this.qiefendataTable=this.dataTable.slice(0,20);
      });
      },
      handleCurrentChange(val){
        this.qiefendataTable=this.dataTable.slice(20*val-20,val*20);
      },
      handleEdit(index, row) {
          this.$router.push({
            path: '/bangongguanli/huiyifaqi',
            query: {
              'wendangid': row.wendangid,
            },
          });
      }
  }
};
</script>
<style lang="scss" scoped>
.oa_search{
  margin-top: 30px;
  background:#efefef;
}
.chaxun{
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
