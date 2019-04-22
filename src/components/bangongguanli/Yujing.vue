<template>
  <div class="yujingyujing">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增预警</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--form-->
    <el-row class="yujing">
      <el-form label-width="80px">
        <el-row>
          <el-form-item label="预警标题">
            <el-input v-if="xiugai" v-model="form.biaoti" placeholder="请输入预警标题"></el-input>
            <div v-else class="xianshi">{{form.biaoti}}</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发起人">
              <div class="xianshi">{{form.nigaoren}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发起部门">
              <div class="xianshi">{{form.nigaodanwei}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="紧急程度">
              <el-select
                v-if="xiugai"
                v-model="form.jinji"
                placeholder="请选择紧急程度"
                style="width:100%;"
              >
                <el-option label="普通" value="普通"></el-option>
                <el-option label="紧急" value="紧急"></el-option>
                <el-option label="非常紧急" value="非常紧急"></el-option>
              </el-select>
              <div v-else class="xianshi">{{form.jinji}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker
                v-if="xiugai"
                value-format="yyyy-MM-dd"
                v-model="form.kaishitime"
                type="date"
                style="width:100%;"
                placeholder="开始时间"
              ></el-date-picker>
              <div v-else class="xianshi">{{form.kaishitime}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker
                v-if="xiugai"
                value-format="yyyy-MM-dd"
                v-model="form.jieshutime"
                type="date"
                style="width:100%;"
                placeholder="结束时间"
              ></el-date-picker>
              <div v-else class="xianshi">{{form.jieshutime}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" class="editer">
          <el-input
            v-if="xiugai"
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="form.beizhu"
          ></el-input>
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
          <el-button v-if="xiugai" type="primary" @click="onSubmit">立即创建</el-button>
          <el-button v-if="xiugai==0&&form.zhuangtai=='未处理'" type="primary" @click="wancheng">处理完成</el-button>
          <el-button type="primary" @click="guanbi">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import * as API from "@/api";
export default {
  mounted() {
    var userdata = JSON.parse(localStorage.getItem("userdata"));
    if (this.$route.query.wendangid) {
      API.getmindocid({
        token: localStorage.getItem("token"),
        wendangid: this.$route.query.wendangid
      }).then(({ data }) => {
        this.form = data.data;
        this.xiugai = 0;
        this.upload.wendangid = this.form.wendangid;
        this.form.fujianList = [];
        for (var i = 0; i < this.form.fileList.length; ++i) {
          this.form.fujianList.push({
            name: this.form.fileList[i].name,
            url:
              this.baseurl +
              "/data/fujian/" +
              this.form.wendangid +
              "/" +
              this.form.fileList[i].name
          });
        }
      });
    } else {
      API.getfawenhao().then(({ data }) => {
        this.form.wendangid = data.wendangid + data.suiji;
        this.form.nigaoid = userdata.id;
        this.form.nigaoren = userdata.name;
        this.form.nigaodanwei = userdata.group;
        this.upload.wendangid = this.form.wendangid;
      });
    }
  },
  data() {
    return {
      xiugai: 1,
      baseurl: API.base,
      baocunfujian: API.baseurl + "baocunfujian",
      upload: {},
      form: {
        doctype: "yujing",
        zhuangtai: "未处理",
        wendangid: "",
        biaoti: "",
        nigaoid: "",
        nigaoren: "",
        nigaodanwei: "",
        jinji: "",
        kaishitime: this.getToday(),
        jieshutime: this.getToday(),
        beizhu: "",
        shenpihis: {},
        fileList: [],
        fujianList: []
      }
    };
  },
  methods: {
    getToday() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    wancheng() {
      API.wanchengmindoc({
        token: localStorage.getItem("token"),
        wendangid: this.form.wendangid
      }).then(({ data }) => {
        this.$message.success({
          showClose: true,
          message: "处理成功！",
          duration: 2000
        });
        this.form.zhuangtai = "处理完成";
      });
    },
    guanbi() {
      this.$router.go(-1);
    },
    onSubmit() {
      API.fasongmindoc({
        token: localStorage.getItem("token"),
        wendang: this.form
      }).then(({ data }) => {
        this.$message.success({
          showClose: true,
          message: "创建成功",
          duration: 2000
        });
        this.$router.go(-1);
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
.yujingyujing {
  text-align: center;
}
.yujing {
  margin-top: 30px;
  margin-left: 20%;
  width: 60%;
}
.xianshi {
  background: #efefef;
}
</style>
