<template>
  <div class="gaozhigaozhi">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公文收文</el-breadcrumb-item>
          <el-breadcrumb-item>发文稿纸</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="gaozhi">
      <el-dropdown @command="handleCommand">
        <el-button size="mini" type="primary">
          发文<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="2">发文</el-dropdown-item>
          <el-dropdown-item command="3">会议发文</el-dropdown-item>
          <el-dropdown-item command="4">党务发文</el-dropdown-item>
          <el-dropdown-item command="5">党务会议发文</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button size="mini" type="primary" @click="fawen(1)">公文印发单</el-button>
      <el-button size="mini" type="primary" @click="fawen(6)">签报</el-button>
      <el-button size="mini" type="primary" @click="fawen(7)">议案报告</el-button>
      <el-button size="mini" type="primary" @click="fawen(8)">购置申请</el-button>
    </div>
  </div>
</template>

<script>
  import * as API from '@/api';
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {
      handleCommand(e){
        this.fawen(e);
      },
      fawen(e) {
        if (e == 1) {
          this.$router.push({
            path: '/fawen/gongwen'
          });
        }
        if (e == 2) {
          this.$router.push({
            path: '/fawen/fawen'
          });
        }
        if (e == 3) {
          this.$router.push({
            path: '/fawen/huiyi'
          });
        }
        if (e == 4) {
          this.$router.push({
            path: '/fawen/dangwu'
          });
        }
        if (e == 5) {
          this.$router.push({
            path: '/fawen/dangwuhuiyi'
          });
        }
        if (e == 6) {
          this.$router.push({
            path: '/fawen/qianbao'
          });
        }
        if (e == 7) {
          this.$router.push({
            path: '/fawen/yian'
          });
        }
        if (e == 8) {
          this.$router.push({
            path: '/fawen/gouzhi'
          });
        }
      }
    }
  };
</script>

<style lang="scss">
  .gaozhi {
    margin-top: 30px;
    text-align: center;
  }
</style>
