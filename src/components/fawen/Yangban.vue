<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公文收文</el-breadcrumb-item>
          <el-breadcrumb-item>发文样板</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="yangban">
      <el-button size="mini" type="primary" @click="fawen(1)">公文印发单</el-button>
      <el-button size="mini" type="primary" @click="fawen(2)">发文</el-button>
      <el-button size="mini" type="primary" @click="fawen(3)">会议发文</el-button>
      <el-button size="mini" type="primary" @click="fawen(4)">党务发文</el-button>
      <el-button size="mini" type="primary" @click="fawen(5)">党务会议发文</el-button>
      <el-button size="mini" type="primary" @click="fawen(6)">签报</el-button>
      <el-button size="mini" type="primary" @click="fawen(7)">议案报告</el-button>
    </div>
  </div>
</template>

<script>
  import * as API from '@/api';
  export default {
    components: {
    },
    data() {
      return {
      };
    },
    methods: {
      fawen(e){
        if(e==1){
          this.$router.push({
            path: '/fawen/gongwen',
          });
        }
        if(e==2){
          this.$router.push({
            path: '/fawen/fawen',
          });
        }
        if(e==3){
          this.$router.push({
            path: '/fawen/huiyi',
          });
        }
        if(e==4){
          this.$router.push({
            path: '/fawen/dangwu',
          });
        }
        if(e==5){
          this.$router.push({
            path: '/fawen/dangwuhuiyi',
          });
        }
        if(e==6){
          this.$router.push({
            path: '/fawen/qianbao',
          });
        }
        if(e==7){
          this.$router.push({
            path: '/fawen/yian',
          });
        }
      }
    }
  };
</script>

<style lang="scss">
.yangban{
  margin-top: 30px;
  text-align: center;
}
</style>
