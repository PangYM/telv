<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人事务</el-breadcrumb-item>
          <el-breadcrumb-item>草稿箱</el-breadcrumb-item>
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
      ></el-table-column>
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
  mounted() {
    let that = this;
    API.getmindoccaogao({
      token: localStorage.getItem('token'),
      doctype: 'youjian'
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
        path: '/youjian/fasongyoujian',
        query: {
          wendangid: row.wendangid
        }
      });
    },
    handleDelete(index, row) {
      API.deletemindoccaogao({
        wendangid: row.wendangid
      }).then(({ data }) => {
        if (data.MSG == 'YES') {
          this.dataTable.splice(index, 1);
          this.$message.success({
                            showClose: true,
                            message: '删除成功！',
                            duration: 2000
                        });
        } else {
          this.$confirm('当前邮件已经发送，您无权限删除', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
            .then(() => {})
            .catch(() => {});
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
</style>
