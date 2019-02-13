<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>办公流程</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--serach-->
    <!--list-->
    <el-table
      :data="tableData4"
      stripe
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="流程号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="流程类型"
        align="center"
        width="300">
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="tiaozhuan" type="text" size="small"> <a  target="_blank" :href="'http://192.168.43.153/data/liuchengtu.png'"><i class="iconfont icon-search"></i></a></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData4: [{
        id: 10001,
        name: '广西铁路旅游集团总经理办公会议组织流程图',
      },
      {
        id: 10002,
        name: '广西铁路旅游集团党委会会议组织工作流程图',
      },
      {
        id: 10003,
        name: '广西铁路旅游集团董事会会议组织工作流程图',
      }],
      form: {
        name: '',
        time: []
      }
    };
  },
  methods: {
    handleGoUrl(url) {
      this.$router.push({ path: url });
    },
    loadState(num) {
      let state = '';
      if (num <= 50) {
        state = 'exception';
      } else if (num > 50 && num < 100) {
        state = '';
      } else {
        state = 'success';
      }
      return state;
    },
    onSubmit() {
      console.log(this.form);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
