<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人事务</el-breadcrumb-item>
          <el-breadcrumb-item>已收邮件</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div class="chaxun">
      <el-input class="chaxun1" size="medium" v-model="query" placeholder="全文搜索"></el-input>
      <el-button type="primary" @click="chaxun">查询</el-button>
      <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleGoUrl">新增发起</el-button>
    </div>
    <div class="chaxun">
      标题颜色说明：
      <a style="color: #008B00">未读</a>，
      <a style="color: #000000">已读</a>
    </div>
    <el-table
      border
      :data="qiefendataTable"
      stripe
      style="width: 100%"
      :default-sort="{prop: 'starttime', order: 'descending'}"
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
          <a v-if="scope.row.weidu" :style="{'color': '#008B00'}">{{scope.row.biaoti}}</a>
          <a v-else :style="{'color': '#000000'}">{{scope.row.biaoti}}</a>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="nigaoren"
        align="center"
        label="发件人"
        show-overflow-tooltip
        width="108"
      ></el-table-column>
      <el-table-column
        sortable
        prop="starttime"
        align="center"
        label="发送时间"
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
      <el-table-column fixed="right" align="center" width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="handleDele(scope.$index, scope.row)">删除</el-button>
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
  created() {
    API.getjieshouguanli({
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
    handleGoUrl() {
      this.$router.push({ path: '/youjian/fasongyoujian' });
    },
    chaxun() {
      API.getjieshouguanli({
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
      this.qiefendataTable[index].weidu=0;
      this.$router.push({
        path: '/youjian/fasongyoujian',
        query: {
          wendangid: row.wendangid
        }
      });
    },
    handleDele(index, row){
      if(row.weidu){
       this.$message({
                message: '当前邮件未读，无法删除，若已读请刷新后重试',
                duration: 2000
              }); 
      }
      else{
        this.$confirm('确认删除邮件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.shanchuyoujian({
            token: localStorage.getItem('token'),
            wendangid: row.wendangid
          }).then(({
            data
          }) => {
            if (data.MSG == 'YES') {
              this.$message.success({
                showClose: true,
                message: '邮件删除成功！请刷新',
                duration: 2000
              });
            }
          });
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
