<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人事务</el-breadcrumb-item>
          <el-breadcrumb-item>已发邮件</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div class="chaxun">
      <el-input class="chaxun1" size="medium" v-model="query" placeholder="全文搜索"></el-input>
      <el-button type="primary" @click="chaxun">查询</el-button>
    </div>
    <el-table
      border=""
      :data="qiefendataTable"
      stripe
      style="width: 100%"
    >
      <el-table-column
        sortable
        prop="biaoti"
        align="center"
        label="标题"
        show-overflow-tooltip
        min-width="200"
      >
        <template slot-scope="scope">
          <a
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.biaoti}}</a>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="starttime"
        align="center"
        label="发送时间"
        show-overflow-tooltip
        width="108"
      ></el-table-column>
      <el-table-column fixed="right" align="center" width="120" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pailei">
      <el-pagination
        @current-change="handleCurrentChange"
        background=""
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
  components: {},
  created() {
    API.getfasongguanli({
      token: localStorage.getItem('token'),
      doctype: 'youjian',
      query: this.query
    }).then(({ data }) => {
      this.dataTable = data.dataTable;
      this.qiefendataTable = this.dataTable.slice(0, 20);
    });
  },
  data() {
    return {
      query: '',
      qiefendataTable: [],
      dataTable: []
    };
  },
  methods: {
    chaxun() {
      API.getfasongguanli({
        token: localStorage.getItem('token'),
        doctype: 'youjian',
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
      this.$router.push({
        path: '/youjian/fasongyoujian',
        query: {
          wendangid: row.wendangid
        }
      });
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
.pailei {
  margin-top: 30px;
  text-align: center;
}
</style>
