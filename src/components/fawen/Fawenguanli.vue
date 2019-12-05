<template>
  <!--面包屑-->
  <div class="oa_main">
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公文收文</el-breadcrumb-item>
          <el-breadcrumb-item>发文管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div class="chaxun">
      <el-input class="chaxun1" size="medium" v-model="query" placeholder="全文搜索" @keyup.enter.native="chaxun"></el-input>
      <el-button size="medium" type="primary" @click="chaxun">查询</el-button>
    </div>
    <div class="chaxun">
      标题颜色说明：
      <a style="color: #008B00" @click="changetable(0)">审批已完成</a>，
      <a style="color: #FF0000" @click="changetable(3)">审批未通过</a>，
      <a style="color: #EEB422" @click="changetable(1)">审批中</a>，
      <a style="color: #DA70D6" @click="changetable(3)">审批已撤销</a>，
      <a style="color: #9400D3" @click="changetable(2)">退文至发起人</a>
    </div>
    <el-table border :data="qiefendataTable" stripe style="width: 100%" :default-sort="{prop: 'starttime', order: 'descending'}">
      <el-table-column sortable prop="biaoti" align="center" label="发文标题" show-overflow-tooltip min-width="200">
        <template slot-scope="scope">
                          <a :style="{'color': scope.row.clour}" @click="handleEdit(scope.$index, scope.row)">{{scope.row.biaoti}}</a>
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
  <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
    查看操作记录</el-button>
</template>
      </el-table-column>
    </el-table>
    <div class="pailei">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        background
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="dataTable1.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import * as API from '@/api';
  export default {
    components: {},
    created() {
      API.getshouwenguanli({
        token: localStorage.getItem('token'),
        doctype: 'fawen',
        query: this.query
      }).then(({
        data
      }) => {
        this.dataTable = data.dataTable;
        this.dataTable1 = data.dataTable;
        for (var i = 0; i < this.dataTable.length; ++i) {
          this.dataTable[i].clour = this.zhuangtai_clour[this.dataTable[i].zhuangtai];
          this.dataTable1[i].clour = this.zhuangtai_clour[this.dataTable1[i].zhuangtai];
        }
        this.qiefendataTable = this.dataTable.slice(0, 20);
      });
    },
    data() {
      return {
        query: '',
        qiefendataTable: [],
        dataTable: [],
        dataTable1: [],
        currentPage: 1,
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
      changetable(e) {
        if (e == 0) {
          this.dataTable1 = [];
          for (var i = 0; i < this.dataTable.length; ++i) {
            if (this.dataTable[i].zhuangtai == '已完成') {
              this.dataTable1.push(this.dataTable[i]);
            }
          }
          this.qiefendataTable = this.dataTable1.slice(0, 20);
          this.currentPage = 1;
        } else if (e == 1) {
          this.dataTable1 = [];
          for (var i = 0; i < this.dataTable.length; ++i) {
            if (this.dataTable[i].zhuangtai == '审批中') {
              this.dataTable1.push(this.dataTable[i]);
            }
          }
          this.qiefendataTable = this.dataTable1.slice(0, 20);
          this.currentPage = 1;
        } else if (e == 2) {
          this.dataTable1 = [];
          for (var i = 0; i < this.dataTable.length; ++i) {
            if (this.dataTable[i].zhuangtai == '退文') {
              this.dataTable1.push(this.dataTable[i]);
            }
          }
          this.qiefendataTable = this.dataTable1.slice(0, 20);
          this.currentPage = 1;
        } else {
          this.dataTable1 = this.dataTable;
          this.qiefendataTable = this.dataTable.slice(0, 20);
          this.currentPage = 1;
        }
      },
      chaxun() {
        API.getshouwenguanli({
          token: localStorage.getItem('token'),
          doctype: 'fawen',
          query: this.query
        }).then(({
          data
        }) => {
          this.dataTable = data.dataTable;
          this.dataTable1 = data.dataTable;
          for (var i = 0; i < this.dataTable.length; ++i) {
            this.dataTable[i].clour = this.zhuangtai_clour[this.dataTable[i].zhuangtai];
            this.dataTable1[i].clour = this.zhuangtai_clour[this.dataTable1[i].zhuangtai];
          }
          this.qiefendataTable = this.dataTable.slice(0, 20);
        });
      },
      handleCurrentChange(val) {
        this.qiefendataTable = this.dataTable1.slice(20 * val - 20, val * 20);
      },
      handleEdit(index, row) {
        if (row.doctype == 'gongwen') {
          this.$router.push({
            path: '/fawen/gongwen',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'fawen') {
          this.$router.push({
            path: '/fawen/fawen',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'huiyi') {
          this.$router.push({
            path: '/fawen/huiyi',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'dangwu') {
          this.$router.push({
            path: '/fawen/dangwu',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'dangwuhuiyi') {
          this.$router.push({
            path: '/fawen/dangwuhuiyi',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'qianbao') {
          this.$router.push({
            path: '/fawen/qianbao',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'yian') {
          this.$router.push({
            path: '/fawen/yian',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'gouzhi') {
          this.$router.push({
            path: '/fawen/gouzhi',
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
  .pailei {
    margin-top: 30px;
    text-align: center;
  }
</style>
