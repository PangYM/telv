<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <b>首页</b>
        </el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>我的签名</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="23" class="warpmain">
      <el-form label-width="80px">
        <el-form-item label="我的签名">
          <el-upload
            class="uploader"
            ref="upload"
            :action="qianmingUrl"
            :show-file-list="false"
            :data="token"
            list-type="picture-card"
            :before-upload="beforeAvatarUpload"
          >
            <img class="avatar" v-if="imageUrl" v-bind:src="imageUrl">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="tijiao" type="primary" @click="handleSaveProfile">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import * as API from '@/api';

export default {
  mounted() {
    API.getqianmingUrl({ token: localStorage.getItem('token') }).then(({ data }) => {
      if (data.qianmingUrl.length > 0) this.imageUrl = API.base + '/data/' + data.qianmingUrl;
    });
  },
  data() {
    return {
      token: { token: localStorage.getItem('token') },
      imageUrl: '',
      qianmingUrl: API.baseurl + 'qianmingUrl'
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleSaveProfile() {
      this.$message.success({
        showClose: true,
        message: '修改成功',
        duration: 2000
      });
      API.setqianmingUrl(this.token).then(({ data }) => {
        this.imageUrl = API.base + '/data/' + data.qianmingUrl;
      });
      API.getUser(this.token).then(({ data }) => {
        localStorage.setItem('userdata', JSON.stringify(data.userinfo));
      });
    }
  }
};
</script>

<style scoped lang="scss">
.warpmain {
  margin-top: 20px;
}
.uploader {
  width: 178px;
  height: 178px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  margin-top: 35px;
  width: 146px;
  height: 78px;
}
.tijiao {
  margin-top: 30px;
}
</style>