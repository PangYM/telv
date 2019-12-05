<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公文收文</el-breadcrumb-item>
          <el-breadcrumb-item>收文草稿</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-table
      border
      :data="dataTable"
      stripe
      style="width: 100%;margin-top:30px;"
      :default-sort="{prop: 'starttime', order: 'descending'}"
    >
      <el-table-column
        sortable
        prop="biaoti"
        align="center"
        min-width="250"
        show-overflow-tooltip
        label="标题"
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
        label="创建时间"
        show-overflow-tooltip
        width="200"
      ></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as API from '@/api';
export default {
  components: {},
  created() {
    let that = this;
    API.getfawencaogao({
      token: localStorage.getItem('token'),
      doctype: 'shouwen'
    }).then(({ data }) => {
      that.dataTable = data.dataTable;
    });
  },
  data() {
    return {
      dataTable: []
    };
  },
  methods: {
    handleEdit(index, row) {
      // localStorage.setItem("fileList", JSON.stringify(row.fileList));
      this.$router.push({
        path: '/shouwen/shouwendengji',
        query: {
          wendangid: row.wendangid
        }
      });
    },
    handleDelete(index, row) {
      API.deletefawencaogao({
        wendangid: row.wendangid
      }).then(({ data }) => {
        if (data == 'YES') {
          this.dataTable.splice(index, 1);
        } else {
          this.$confirm('当前文档已经发送，您无权限删除', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {})
            .catch(() => {});
        }
      });
      this.dataTable.splice(index, 1);
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
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
  .chaxun1 {
    width: 300px;
  }
}
</style>
