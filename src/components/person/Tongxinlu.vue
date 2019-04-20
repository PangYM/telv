<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人事务</el-breadcrumb-item>
          <el-breadcrumb-item>通信录</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div class="chaxun">
      <el-input class="chaxun1" size="medium" v-model="query" placeholder="全文搜索" @keyup.enter.native="chaxun"></el-input>
      <el-button size="mini" type="primary" @click="chaxun">查询</el-button>
    </div>
    <el-table border :data="dataTable" stripe style="width: 100%" :default-sort = "{prop: 'name', order: 'descending'}">
      <el-table-column sortable prop="name" align="center" label="姓名" show-overflow-tooltip width="200">
      </el-table-column>
      <el-table-column sortable prop="group" align="center" label="部门" show-overflow-tooltip width="200">
      </el-table-column>
      <el-table-column sortable prop="zhiweiname" align="center" label="职位" show-overflow-tooltip width="200">
      </el-table-column>
      <el-table-column sortable prop="phone" align="center" label="手机" show-overflow-tooltip width="200">
      </el-table-column>
      <el-table-column sortable prop="dianhua" align="center" label="电话" show-overflow-tooltip width="200">
      </el-table-column>
      <el-table-column sortable prop="email" fixed="right" align="center" label="邮件" show-overflow-tooltip width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as API from '@/api';
  import {
    VueEditor
  } from 'vue2-editor';
  export default {
    components: {
      VueEditor
    },
    mounted() {
      API.getusers({
        'query':this.query,
      }).then(({
        data
      }) => {
        this.dataTable = data.dataTable;
      });
    },
    data() {
      return {
        query:'',
        dataTable: [],
      };
    },
    methods: {
      chaxun(){
        API.getusers({
        'query':this.query,
      }).then(({
        data
      }) => {
        this.dataTable = data.dataTable;
      });
      },
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
  .pailei{
    margin-top: 30px;
    text-align: center;
  }
</style>
