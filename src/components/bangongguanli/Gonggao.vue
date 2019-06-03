<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>公告发起</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-row class="gonggao">
      <div class="fasong">
        <el-button type="primary" v-if="xiugai" @click="querenfasong">立即创建</el-button>
        <el-button type="primary" v-if="xiugai&&yulan" @click="querenyulan">预览</el-button>
        <el-button type="primary" v-if="xiugai==0&&yulan" @click="querenyulan">关闭预览</el-button>
        <el-button type="primary" @click="guanbi()">关闭</el-button>
      </div>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="公告标题">
            <el-input v-if="xiugai" v-model="form.biaoti" placeholder="请输入公告标题"></el-input>
            <div v-else class="xianshi">{{form.biaoti}}</div>
          </el-form-item>
          <el-row></el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发起人">
                <div class="xianshi">{{form.nigaoren}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.faqitime.length" label="发起时间">
                <el-input v-if="xiugai" :disabled="!xiugai" v-model="form.faqitime" placeholder></el-input>
                <div v-else class="xianshi">{{form.faqitime}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="正文" class="editer">
            <vue-editor
              v-if="xiugai"
              useCustomImageHandler
              @imageAdded="handleImageAdded"
              v-model="form.content"
            ></vue-editor>
            <div class="html" v-else v-html="form.content"></div>
          </el-form-item>
          <el-form-item v-if="xiugai==0" label="附件">
            <li v-bind="form.fileList" v-for="item in form.fileList" :key="item.name">
              <a
                target="_blank"
                :href="baseurl+'/data/fujian/'+form.wendangid+'/'+item.name"
              >{{item.name}}</a>
            </li>
          </el-form-item>
          <el-form-item v-if="xiugai" label="附件">
            <el-upload
              drag
              ref="upload"
              :action="baocunfujian"
              :data="upload"
              :on-change="handlechange"
              :on-remove="handleremove"
              :file-list="form.fujianList"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将附件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as API from '@/api';
import treeTransfer from 'el-tree-transfer';
import { VueEditor } from 'vue2-editor';
import axios from 'axios';
export default {
  components: {
    VueEditor,
    treeTransfer
  },
  mounted() {
    var userdata = JSON.parse(localStorage.getItem('userdata'));
    if (this.$route.query.wendangid) {
      API.getmindocid({
        token: localStorage.getItem('token'),
        wendangid: this.$route.query.wendangid
      }).then(({ data }) => {
        this.form = data.data;
        this.xiugai = 0;
        this.yulan = 0;
        this.shenpi = data.shenpi;
        this.upload.wendangid = this.form.wendangid;
        this.form.fujianList = [];
        for (var i = 0; i < this.form.fileList.length; ++i) {
          this.form.fujianList.push({
            name: this.form.fileList[i].name,
            url: this.baseurl + '/data/fujian/' + this.form.wendangid + '/' + this.form.fileList[i].name
          });
        }
        API.mindocyiyue({
          token: localStorage.getItem('token'),
          wendangid: this.$route.query.wendangid
        }).then(({ data }) => {});
      });
    } else {
      API.getfawenhao().then(({ data }) => {
        this.form.wendangid = data.wendangid + data.suiji;
        this.upload.wendangid = this.form.wendangid;
        this.form.nigaouserid = userdata.userid;
        this.form.nigaoren = userdata.name;
        this.form.nigaodanwei = userdata.group;
      });
    }
  },
  data() {
    return {
      yulan: 1,
      xiugai: 1,
      istongxinlu: 0,
      title: ['未选列表', '已选列表'],
      mode: 'transfer',
      istongxinlu: 0,
      fromData: [],
      toData: [],
      baseurl: API.base,
      baocunfujian: API.baseurl + 'baocunfujian',
      upload: {},
      form: {
        doctype: 'gonggao',
        zhuangtai: '已完成',
        wendangid: '',
        biaoti: '',
        nigaouserid: '',
        nigaoren: '',
        nigaodanwei: '',
        faqitime: '',
        content: ' ',
        shenpihis: {},
        fileList: [],
        fujianList: []
      }
    };
  },
  methods: {
    querenyulan() {
      this.xiugai = 1 - this.xiugai;
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      API.baocunimage(file).then(result => {
        let url = result.data.url;
        url = API.base + '/data/' + url;
        Editor.insertEmbed(cursorLocation, 'image', url);
        resetUploader();
      });
    },
    querenfasong() {
      if (this.form.biaoti.length == 0) {
        this.$message({
          showClose: true,
          message: '公告标题不能为空',
          duration: 2000
        });
        return '';
      }
      var fasongdata = {
        wendang: this.form,
        token: localStorage.getItem('token')
      };
      API.fasongmindoc(fasongdata).then(({ data }) => {
        if (data.MSG == 'YES') {
          this.$message.success({
            showClose: true,
            message: '发送成功',
            duration: 2000
          });
          this.$router.push({
            path: '/main'
          });
        } else {
          this.$message({
            message: '参数错误，请刷新后重试'
          });
        }
      });
    },
    guanbi() {
      this.$router.go(-1);
    },
    add(fromData, toData, obj) {
      this.fromData = fromData;
      this.toData = toData;
    },
    remove(fromData, toData, obj) {
      this.fromData = fromData;
      this.toData = toData;
    },
    handlechange(file, fileList) {
      this.form.fileList = [];
      for (var i = 0; i < fileList.length; ++i) {
        this.form.fileList.push({
          name: fileList[i].name
        });
      }
    },
    handleremove(file, fileList) {
      this.form.fileList = [];
      for (var i = 0; i < fileList.length; ++i) {
        this.form.fileList.push({
          name: fileList[i].name
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.xianshi {
  background: #efefef;
}
.gonggao {
  margin: 25px 0;
  text-align: center;
  width: 80%;
  margin-left: 10%;
}
.fasong {
  text-align: center;
  margin-bottom: 30px;
}
.html {
  background: #efefef;
  width: 100%;
}
</style>
