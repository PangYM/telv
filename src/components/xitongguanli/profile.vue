<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>我的信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  
    <el-col :span="23" class="warpmain">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <div class="xianshi">{{form.id}}</div>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <div class="xianshi">{{form.name}}</div>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="dianhua" label="办公电话">
          <el-input v-model="form.dianhua"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import * as API from '@/api';
  
  export default {
    mounted() {
      API.getUser({'token':localStorage.getItem('token')}).then(({
        data
      }) => {
        this.form = data.userinfo;
      });
    },
    data() {
      return {
        form: {
          id: '',
          name: '',
          email: '',
          phone: '',
          dianhua: '',
        },
      };
    },
    methods: {
      handleSaveProfile() {
        API.setUserProfile(this.form).then(({
          data
        }) => {
          localStorage.setItem('userdata', JSON.stringify(data));
            this.$message.success({
                showClose: true,
                message: '修改成功！',
                duration: 2000
              });
            return '';
        });
      }
    },
  };
</script>

<style scoped lang="scss">
  .warpmain {
    margin-top: 20px;
  }
  .xianshi{
    background: #efefef;
  }
</style>