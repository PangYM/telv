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
        <el-input class="chaxun1" size="medium" v-model="query" placeholder="全文搜索" @keyup.enter.native="chaxun"></el-input>
        <el-select v-model="doctype" placeholder="请选择文档类型" style="width:15%;">
          <el-option label="收文" value="shouwen"></el-option>
          <el-option label="公文印发单" value="gongwen"></el-option>
          <el-option label="发文" value="fawen"></el-option>
          <el-option label="会议发文" value="huiyi"></el-option>
          <el-option label="党务发文" value="dangwu"></el-option>
          <el-option label="党务会议发文" value="dangwuhuiyi"></el-option>
          <el-option label="签报" value="qianbao"></el-option>
          <el-option label="议案报告" value="yian"></el-option>
          <el-option label="购置申请" value="gouzhi"></el-option>
          <el-option label="邮件" value="youjian"></el-option>
          <el-option label="公告" value="gonggao"></el-option>
          <el-option label="督办" value="duban"></el-option>
          <el-option label="汇报" value="huibao"></el-option>
          <el-option label="会议" value="huiyifaqi"></el-option>
          <el-option label="提醒" value="tixing"></el-option>
        </el-select>
        <el-button size="medium" type="primary" @click="chaxun">查询</el-button>
      </div>
      <el-table border :data="qiefendataTable" stripe style="width: 100%">
        <el-table-column sortable prop="biaoti" align="center" label="标题" show-overflow-tooltip min-width="200">
          <template slot-scope="scope">
            <a size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">{{scope.row.biaoti}}</a>
</template>
        </el-table-column>
        <el-table-column sortable prop="nigaoren" align="center" label="发文人" show-overflow-tooltip width="108"></el-table-column>
        <el-table-column sortable prop="starttime" align="center" label="发文时间" show-overflow-tooltip width="108"></el-table-column>
        <el-table-column fixed="right" align="center" width="160" label="操作">
<template slot-scope="scope">
  <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
    查看</el-button>
  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
</template>
        </el-table-column>
      </el-table>
    </div>
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
      var userdata = JSON.parse(localStorage.getItem('userdata'));
      this.quanxian = userdata.quanxian;
      this.chaxun();
    },
    data() {
      return {
        query: '',
        doctype: 'shouwen',
        quanxian: 0,
        dataTable: [],
        qiefendataTable: []
      };
    },
    methods: {
      handleCurrentChange(val) {
        this.qiefendataTable = this.dataTable.slice(20 * val - 20, val * 20);
      },
      handleDelete(index, row) {
        this.$confirm('确认删除文档?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.shanchuwendang({
            token: localStorage.getItem('token'),
            wendangid: row.wendangid
          }).then(({
            data
          }) => {
            if (data.MSG == 'YES') {
              this.$message.success({
                showClose: true,
                message: '删除文档成功！',
                duration: 2000
              });
              this.qiefendataTable.splice(index, 1);
              for (var i = 0; i < this.dataTable.length; ++i) {
                if (this.dataTable[i].wendangid == row.wendangid) {
                  this.dataTable.splice(i, 1);
                }
              }
            }
          });
        });
      },
      chaxun() {
        API.chaxunwendang({
          token: localStorage.getItem('token'),
          query: this.query,
          doctype: this.doctype
        }).then(({
          data
        }) => {
          if (data.MSG == 'NO') {
            this.$message({
              showClose: true,
              message: '当前文档编号不存在',
              duration: 2000
            });
          } else {
            this.dataTable = data.dataTable;
            this.qiefendataTable = this.dataTable.slice(0, 20);
          }
        });
      },
      handleEdit(index, row) {
        if (row.doctype == 'shouwen') {
          this.$router.push({
            path: '/shouwen/shouwendengji',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'gongwen') {
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
        } else if (row.doctype == 'youjian') {
          this.$router.push({
            path: '/youjian/fasongyoujian',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'gonggao') {
          this.$router.push({
            path: '/bangongguanli/gonggao',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'duban') {
          this.$router.push({
            path: '/bangongguanli/duban',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'huibao') {
          this.$router.push({
            path: '/bangongguanli/huibao',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'huiyifaqi') {
          this.$router.push({
            path: '/bangongguanli/huiyifaqi',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (row.doctype == 'tixing') {
          this.$router.push({
            path: '/bangongguanli/tixing',
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
