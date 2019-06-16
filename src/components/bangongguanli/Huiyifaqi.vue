<template>
  <div class="huiyifaqihuiyifaqi">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>会议发起</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-row class="huiyifaqi">
      <el-col :span="24">
        <el-form label-width="80px">
          <el-form-item label="会议主题">
            <el-input v-if="xiugai" v-model="form.biaoti" placeholder="请输入会议主题"></el-input>
            <div v-else class="xianshi">{{form.biaoti}}</div>
          </el-form-item>
          <el-form-item label="会议地点">
            <el-input v-if="xiugai" v-model="form.didian" placeholder="请输入会议地点"></el-input>
            <div v-else class="xianshi">{{form.didian}}</div>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="会议日期">
                <el-date-picker
                  v-if="xiugai"
                  v-model="form.riqi"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width:100%;"
                  placeholder="选择日期"
                ></el-date-picker>
                <div v-else class="xianshi">{{form.riqi}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发起人">
                <div class="xianshi">{{form.nigaoren}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发起单位">
                <div class="xianshi">{{form.nigaodanwei}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="与会人员">
            <el-button type="primary" v-if="xiugai" @click="querensend">添加人员</el-button>
            <div class="renyuan" v-if="istongxinlu">
              <tree-transfer
                class="tongxinlu"
                :title="title"
                :from_data="fromData"
                :to_data="toData"
                :defaultProps="{label:'label'}"
                @addBtn="add"
                @removeBtn="remove"
                :mode="mode"
                width="50%"
                height="500px"
                filter
              ></tree-transfer>
            </div>
            <a v-bind="form.shenpihis" v-for="item in form.shenpihis" :key="item.name">
              <a v-if="item.caozuo=='未完成'" :span="4" style="color:#0000FF">{{item.name}};</a>
              <a v-else :span="4" style="color:#000000">{{item.name}};</a>
            </a>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-if="xiugai" type="textarea" v-model="form.beizhu" :autosize="true"></el-input>
            <div v-else class="xianshi">{{form.beizhu}}</div>
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
          <el-form-item>
            <el-button v-if="xiugai" type="primary" @click="onSubmit">立即发起</el-button>
            <el-button type="primary" @click="guanbi">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as API from '@/api';
import treeTransfer from 'el-tree-transfer';
export default {
  components: {
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
        this.upload.wendangid = this.form.wendangid;
        this.form.fujianList = [];
        for (var i = 0; i < this.form.fileList.length; ++i) {
          this.form.fujianList.push({
            name: this.form.fileList[i].name,
            url: this.baseurl + '/data/fujian/' + this.form.wendangid + '/' + this.form.fileList[i].name
          });
        }
      });
    } else {
      API.getfawenhao().then(({ data }) => {
        this.form.wendangid = data.wendangid + data.suiji;
        this.form.nigaouserid = userdata.userid;
        this.form.nigaoren = userdata.name;
        this.form.nigaodanwei = userdata.group;
        this.upload.wendangid = this.form.wendangid;
      });
    }
    API.gettongxinlu({ token: localStorage.getItem('token') }).then(({ data }) => {
      this.fromData = data.tongxinlu;
    });
  },
  data() {
    return {
      xiugai: 1,
      istongxinlu: 0,
      title: ['未选列表', '已选列表'],
      mode: 'transfer',
      fromData: [],
      toData: [],
      baseurl: API.base,
      baocunfujian: API.baseurl + 'baocunfujian',
      upload: {},
      form: {
        doctype: 'huiyifaqi',
        zhuangtai: '已完成',
        wendangid: '',
        biaoti: '',
        didian: '',
        nigaouserid: '',
        nigaoren: '',
        riqi: this.getToday(),
        beizhu: '',
        shenpihis: {},
        fileList: [],
        fujianList: []
      }
    };
  },
  methods: {
    getToday() {
      var date = new Date();
      var seperator1 = '-';
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    guanbi() {
      localStorage.setItem('shuaxin', 0);
      this.$router.go(-1);
    },
    querensend() {
      this.istongxinlu = 1;
    },
    add(fromData, toData, obj) {
      this.fromData = fromData;
      this.toData = toData;
    },
    remove(fromData, toData, obj) {
      this.fromData = fromData;
      this.toData = toData;
    },
    onSubmit() {
      if (this.toData.length == 0) {
        this.$message({
          showClose: true,
          message: '请选择发送人',
          duration: 2000
        });
        return '';
      }
      var fasongdata = {
        toData: this.toData,
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
.huiyifaqihuiyifaqi {
  text-align: center;
}
.huiyifaqi {
  margin-top: 30px;
  width: 80%;
  margin-left: 10%;
}
.xianshi {
  background: #efefef;
}
</style>
