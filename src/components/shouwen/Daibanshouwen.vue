<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公文收文</el-breadcrumb-item>
          <el-breadcrumb-item>待办收文</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div class="chaxun">
      <el-input
        class="chaxun1"
        size="medium"
        v-model="query"
        placeholder="全文搜索"
        @keyup.enter.native="chaxun"
      ></el-input>
      <el-button size="medium" type="primary" @click="chaxun">查询</el-button>
    </div>
    <div class="chaxun">
      标题颜色说明：
      <a style="color: #008B00">审批已完成</a>，
      <a style="color: #FF0000">审批未通过</a>，
      <a style="color: #EEB422">审批中</a>，
      <a style="color: #DA70D6">审批已撤销</a>，
      <a style="color: #9400D3">退文至发起人</a>
    </div>
    <el-table
      border
      :data="qiefendataTable"
      stripe
      style="width: 100%"
      :default-sort="{prop: 'laiwentime', order: 'descending'}"
    >
      <el-table-column
        sortable
        prop="biaoti"
        align="center"
        label="来文标题"
        show-overflow-tooltip
        min-width="200"
      >
        <template slot-scope="scope">
          <a :style="{'color': scope.row.clour}">{{scope.row.biaoti}}</a>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="fawenren"
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
      <el-table-column
        sortable
        prop="laiwenren"
        align="center"
        label="来文人"
        show-overflow-tooltip
        width="108"
      ></el-table-column>
      <el-table-column
        sortable
        prop="laiwentime"
        align="center"
        label="来文时间"
        show-overflow-tooltip
        width="108"
      ></el-table-column>
      <el-table-column
        sortable
        prop="endtime"
        align="center"
        label="结束时间"
        show-overflow-tooltip
        width="108"
      ></el-table-column>
      <el-table-column
        sortable
        prop="zhuangtai"
        align="center"
        label="状态"
        show-overflow-tooltip
        width="100"
      >
        <template slot-scope="scope">
          <a :style="{'color': scope.row.clour}">{{scope.row.zhuangtai}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="liuchenging"
        align="center"
        label="当前流程"
        show-overflow-tooltip
        width="130"
      ></el-table-column>
      <el-table-column fixed="right" align="center" width="120" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看操作记录</el-button>
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
import * as API from '@/api';
export default {
  components: {},
  mounted() {
    API.getdaibanfawen({
      token: localStorage.getItem('token'),
      doctype: 'shouwen',
      query: this.query
    }).then(({ data }) => {
      this.dataTable = data.dataTable;
      for (var i = 0; i < this.dataTable.length; ++i) {
        this.dataTable[i].clour = this.zhuangtai_clour[this.dataTable[i].zhuangtai];
      }
      this.qiefendataTable = this.dataTable.slice(0, 20);
    });
  },
  data() {
    return {
      query: '',
      qiefendataTable: [],
      dataTable: [],
      newclour: '#008B00',
      zhuangtai_clour: {
        已完成: '#008B00',
        未通过: '#FF0000',
        审批中: '#EEB422',
        已撤销: '#DA70D6',
        退文: '#9400D3'
      }
    };
  },
  methods: {
    chaxun() {
      API.getdaibanfawen({
        token: localStorage.getItem('token'),
        doctype: 'shouwen',
        query: this.query
      }).then(({ data }) => {
        this.dataTable = data.dataTable;
        for (var i = 0; i < this.dataTable.length; ++i) {
          this.dataTable[i].clour = this.zhuangtai_clour[this.dataTable[i].zhuangtai];
        }
        this.qiefendataTable = this.dataTable.slice(0, 20);
      });
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/shouwen/shouwendengji',
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
