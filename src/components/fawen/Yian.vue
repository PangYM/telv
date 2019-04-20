<template>
  <div class="baogaobaogao">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">公文发文</el-breadcrumb-item>
          <el-breadcrumb-item>议案报告</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div v-if="xianshi">
    <div class="dayin">
      <el-button type="primary" v-if="xiugai" @click="querenfasong(0)">保存</el-button>
      <el-button type="primary" v-if="tuiwen" @click="querentuiwen">退文至发起人</el-button>
      <el-button type="primary" v-if="tuiwen" @click="querenfanhui">退回上一级</el-button>
      <el-button type="primary" v-if="quanxian<=20&&yuedu" @click="querenchehui">撤回</el-button>
      <el-button type="primary" v-if="pishi" @click="querenshenpi">审批</el-button>
      <el-button type="primary" :loading="loading" @click="querensend">发送</el-button>
      <el-button type="primary" v-if="yuedu&&form.zhuangtai!='退文'" @click="querenyuedu">办理</el-button>
      <el-button type="primary" v-if="yuedu&&form.zhuangtai=='退文'" @click="querenyuedu">已阅</el-button>
      <el-button type="primary" v-if="!xiugai" @click="piyuejilu">查看批阅记录</el-button>
      <el-button type="primary" v-print="'#baogao'">打印</el-button>
      <el-button type="primary" @click="guanbi(0)">关闭</el-button>
    </div>
    <div class="renyuan" v-if="istongxinlu">
      <tree-transfer class="tongxinlu" :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' width="50%" height="500px" filter>
      </tree-transfer>
      <el-button type="primary" @click="querenfasong(1)">确定发送</el-button>
      <el-button type="primary" @click="guanbi(1)">关闭</el-button>
    </div>
    <el-row class="baogao" id="baogao">
      <div class="bantou">议案报告
      </div>
      <div class="riqi">日期：
        <el-date-picker class="riqi1" value-format="yyyy-MM-dd" v-if="xiugai" v-model="form.riqi" type="date" placeholder="选择日期">
        </el-date-picker>
        <a v-else style="color:#000000">{{form.riqi}}</a>
      编号：（<el-input v-if="xiugai" class="bianhao" size="small" v-model="form.bianhao" placeholder=""></el-input>）号
      </div>
      <div class="kuang">
        <div class="kuang1">
          <div class="kuang11">
            主要领导批示
            </div>
          <div class="kuang12">
          <li v-bind="form.biglingdaolist" v-for="item in form.biglingdaolist" :key="item.name">
              <a style="color:#000000">{{item.yijian}}</a><img class="qianming" :src="getImgUrl(item.imageurl)"/> <a style="color:#000000">{{item.time}}</a>
            </li>
          <el-input class="neirong" v-if="pishi==1" size="medium" v-model="lingdaopishi" placeholder=""></el-input>
          </div>
        </div>
        <div class="kuang1">
            <div class="kuang11">
            分管领导批示
            </div>
          <div class="kuang12">
          <li v-bind="form.midlingdaolist" v-for="item in form.midlingdaolist" :key="item.name">
              <a style="color:#000000">{{item.yijian}}</a><img class="qianming" :src="getImgUrl(item.imageurl)"/> <a style="color:#000000">{{item.time}}</a>
            </li>
          <el-input class="neirong" v-if="pishi>1" size="medium" v-model="lingdaopishi" placeholder=""></el-input>
          </div>
        </div>
        <div class="kuang3">
          <div class="kuang30">
            标题
          </div>
          <div class="biaoti">
            <el-input v-if="xiugai" size="small" v-model="form.biaoti" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.biaoti}}</a>
          </div>
        </div>
        <div class="kuang1">
          <div class="kuang11">
            内容
          </div>
          <div class="neirong">
            <el-input v-if="xiugai" type="textarea" rows="7" size="small" v-model="form.neirong" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.neirong}}</a>
          </div>
        </div>
        <div class="kuang3">
          <div class="kuang30">
            主办单位
          </div>
          <div class="kuang33">
            <el-input v-if="xiugai" size="medium" v-model="form.zhubandanwei" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.zhubandanwei}}</a>
          </div>
          <div class="kuang30">
            负责人签名
          </div>
          <div class="kuang34">
            <div v-on="form.lingdao.imageurl" v-if="form.lingdao.imageurl">
            <img class="qianming" :src="getImgUrl(form.lingdao.imageurl)"/> 
            <a style="color:#000000">{{form.lingdao.time}}</a>
            </div>
          </div>
        </div>
        <div class="kuang3">
          <div class="kuang30">
            拟稿人
          </div>
          <div class="kuang32">{{form.nigaoren}}</div>
          <div class="kuang31">
            拟稿单位
          </div>
          <div class="kuang32">{{form.nigaodanwei}}</div>
          <div class="kuang31">
            电话
          </div>
          <div class="kuang32">{{form.nigaorendianhua}}</div>
        </div>
        <div class="wenjianbanli">
          <div class="wenjianbanli1">
            文件办理
          </div>
          <div class="wenjianbanli2">
            <li v-bind="form.qianyuelist" v-for="item in form.qianyuelist" :key="item.name">
              <a style="color:#000000">{{item.name}} {{item.time}} {{item.yijian}}</a>
              </li>
              <el-input v-if="yuedu" size="medium" v-model="banli" placeholder=""></el-input>
          </div>
        </div>
        <div class="fujian">
          <div class="fujian1">
            附件
          </div>
          <div class="fujian2">
            <li v-bind="form.fileList" v-for="item in form.fileList" :key="item.name">
              <a target="_blank" :href="baseurl+'/data/fujian/'+form.wendangid+'/'+item.name">
                                                                              {{item.name}}
                                                                              </a>
            </li>
          </div>
        </div>
      </div>
    </el-row>
    <div v-if="xiugai" class="upload">
      <el-upload drag ref="upload" :action="baocunfujian" :data="upload" :on-change="handlechange" :on-remove="handleremove" :file-list="form.fujianList" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将附件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    </div>
    <div v-else>
      <el-button type="primary" @click="piyuejilu">关闭</el-button>
    <el-table border :data="form.liuchenglist" stripe style="width: 100%;margin-top:30px;" :default-sort = "{prop: 'time', order: 'descending'}">
      <el-table-column sortable prop="name" align="center" width="200" label="人员">
      </el-table-column>
      <el-table-column sortable prop="miaoshu" align="center" min-width="250" show-overflow-tooltip label="操作">
      </el-table-column>
      <el-table-column sortable prop="time" fixed="right" align="center" label="时间" width="200">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
  import * as API from '@/api';
  import treeTransfer from 'el-tree-transfer';
  import {
    VueEditor
  } from 'vue2-editor';
  export default {
    components: {
      VueEditor,
      treeTransfer
    },
    mounted() {
      var userdata = JSON.parse(localStorage.getItem('userdata'));
      this.quanxian=userdata.quanxian;
      if (this.$route.query.wendangid) {
        API.getwendangid({
          'token': localStorage.getItem('token'),
          'wendangid': this.$route.query.wendangid
        }).then(({
          data
        }) => {
          this.form = data.data;
          this.xiugai = data.xiugai;
          this.hegao = data.hegao;
          this.tuiwen = data.tuiwen;
          this.pishi = data.pishi;
          this.yuedu=data.yuedu;
          this.upload.wendangid = this.form.wendangid;
          if (this.hegao){
            this.form.lingdao.imageurl=userdata.qianmingUrl;
            var myDate = new Date();
            this.form.lingdao.time = myDate.toLocaleString();
          }
          this.form.fujianList = [];
          for (var i = 0; i < this.form.fileList.length; ++i) {
            this.form.fujianList.push({
              'name': this.form.fileList[i].name,
              'url': this.baseurl + '/data/fujian/' + this.form.wendangid + '/' + this.form.fileList[i].name
            });
          }
        });
      } else {
        API.getfawenhao().then(({
          data
        }) => {
          this.form.wendangid = data.wendangid + data.suiji;
          this.upload.wendangid = this.form.wendangid;
          this.form.nigaoid = userdata.id;
          this.form.nigaoren = userdata.name;
          this.form.nigaodanwei = userdata.group;
          this.form.nigaorendianhua = userdata.phone;
          if (userdata.quanxian == 30) {
            this.form.hegaoren = userdata.name;
            this.form.hegaodanwei = userdata.group;
            this.form.hegaorendianhua = userdata.phone;
          }
        });
      }
      API.gettongxinlu({'token': localStorage.getItem('token')})
          .then(({
            data
          }) => {
            this.fromData = data.tongxinlu;
          });
    },
    data() {
      return {
        quanxian:50,
        xianshi:1,
        xiugai: 1,
        hegao: 0,
        tuiwen: 0,
        pishi:0,
        yuedu:0,
        lingdaopishi:'',
        banli:'',
        title: ['未选列表', '已选列表'],
        mode: "transfer",
        istongxinlu: 0,
        fromData: [],
        toData: [],
        baseurl: API.base,
        loading: false,
        baocunfujian: API.baseurl + 'baocunfujian',
        upload: {},
        form: {
          doctype: 'yian',
          wendangid: '',
          nigaoid:'',
          zhuangtai:'caogao',
          riqi: this.getToday(),
          bianhao: '',
          biglingdaolist:[],
          midlingdaolist:[],
          minlingdaolist:[],
          falvlingdaolist:[],
          lingdao:{
            yijian:'',
            imageurl:'',
            time:'',
          },
          biaoti: '',
          neirong: '',
          nigaoren: '',
          nigaodanwei: '',
          nigaorendianhua: '',
          nibanyijian:{
            yijian:'',
            name:'',
            time:'',
          },
          shenpihis:{},
          liuchenglist:[],
          qianyuelist:[],
          fileList: [],
          fujianList: [],
        },
      }
    },
    methods: {
      querenfanhui(){
        this.$confirm('确认退回上一级?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.hegao = 0;
          this.tuiwen = 0;
          this.xiugai = 0;
          this.pishi = 0;
          API.fanhui({
            'token': localStorage.getItem('token'),
            'wendangid': this.form.wendangid,
            'nibanyijian':this.form.nibanyijian,
            'lingdaopishi':this.lingdaopishi,
            'pishi':this.pishi,
          }).then(({
            data
          }) => {});
          this.$message({
            type: 'success',
            message: '退回成功!',
            duration: 1000,
          });
        }).catch(() => {});
      },
      querenchehui(){
        this.$confirm('确认撤回?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.hegao = 0;
          this.tuiwen = 0;
          this.xiugai = 0;
          this.pishi = 0;
          API.chehui({
            'token': localStorage.getItem('token'),
            'wendangid': this.form.wendangid,
          }).then(({
            data
          }) => {});
          this.$message({
            type: 'success',
            message: '撤回成功!',
            duration: 1000,
          });
        }).catch(() => {});
      },
      getToday(){
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
      piyuejilu(){
        this.xianshi=1-this.xianshi;
      },
      querenyuedu(){
        API.yiyue({
          'token': localStorage.getItem('token'),
          'wendangid': this.form.wendangid,
          'banli':this.banli,
        }).then(({
          data
        }) => {
          this.form.qianyuelist=data.qianyuelist;
          this.$message.success({
                showClose: true,
                message: this.form.zhuangtai!='退文'?'办理成功！':'已阅成功！',
                duration: 1000
              });
          this.yuedu=0;
        });
      },
      getImgUrl(imageurl){
        return API.base+'/data/'+imageurl;
      },
      querensend() {
        this.istongxinlu = 1;
        if(this.yuedu){
          this.querenyuedu();
        }
        if(this.pishi){
          this.querenshenpi();
        }
      },
      guanbi(e) {
        if (e == 0) {
          this.$router.go(-1);
        } else {
          this.istongxinlu = 0;
        }
      },
      querentuiwen() {
        this.$confirm('确认退文至发起人?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.hegao = 0;
          this.tuiwen = 0;
          this.xiugai = 0;
          this.pishi = 0;
          API.tuiwen({
            'token': localStorage.getItem('token'),
            'wendangid': this.form.wendangid,
            'nibanyijian':this.form.nibanyijian,
          }).then(({
            data
          }) => {});
          this.$message({
            type: 'success',
            message: '退文成功!',
            duration: 1000,
          });
        }).catch(() => {});
      },
      querenshenpi(){
        this.$confirm('确认审批?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        API.pishi({
            'token': localStorage.getItem('token'),
            'wendangid':this.form.wendangid,
            'pishi':this.pishi,
            'lingdaopishi':this.lingdaopishi,
          }).then(({
            data
          }) => {
            this.pishi=0;
            this.form.biglingdaolist=data.biglingdaolist;
            this.form.midlingdaolist=data.midlingdaolist;
            this.form.minlingdaolist=data.minlingdaolist;
            this.form.falvlingdaolist=data.falvlingdaolist;
          });
          this.$message.success({
                showClose: true,
                message: '审批成功',
                duration: 1000
              });
        })
      },
      querenfasong(e) {
        if(e&&this.toData.length==0){
          this.$message({
            showClose: true,
            message: '请选择发送人',
            duration: 1000
          });
          return "";
        }
        this.loading = true;
        var fasongdata={
          'toData': this.toData,
          'wendang':this.form,
          'token':localStorage.getItem('token'),
        };
        if(!e) fasongdata.toData=[];
        API.fasongwendang(fasongdata)
          .then(({
            data
          }) => {
            this.loading=false;
            this.$message.success({
              showClose: true,
              message: '发送成功',
              duration: 1000
            });
            if(e)
              this.$router.go(-1);
          });
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
            'name': fileList[i].name
          });
        }
      },
      handleremove(file, fileList) {
        this.form.fileList = [];
        for (var i = 0; i < fileList.length; ++i) {
          this.form.fileList.push({
            'name': fileList[i].name
          });
        }
      },
    }
  };
</script>

<style lang="scss">
  .baogaobaogao{
    text-align: center;
  }
  .dayin {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .renyuan {
    text-align: center;
    .tongxinlu {
      margin-left: 25%;
    }
  }
  
  .baogao{
    margin-left: 20%;
    width: 60%;
    color: #FF0000;
    .bantou {
      display: flex;
      justify-content: center;
      padding-top: 50px;
      font-size: 35px;
      text-align: center;
    }
    .riqi {
      margin-top: 20px;
      display: flex;
      line-height: 50px;
      .riqi1{
        margin-right: 45%;
      }
      .bianhao{
        width: 80px;
      }
    }
    .kuang{
      border: 2px solid red;
      .kuang1{
        min-height: 150px;
        line-height: 150px;
        border-bottom: 2px solid red;
        display: flex;
        .kuang11 {
          width: 13%;
          border-right: 2px solid red;
        }
        .kuang12{
          width: 87%;
          text-align: center;
          .qianming{
            height: 50px;
            width: 100px;
          }
        }
        .neirong{
          width:87%    
        }
      }
      .kuang3 {
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid red;
        display: flex;
        .kuang30 {
          width: 13%;
          border-right: 2px solid red;
        }
        .kuang31 {
          width: 13%;
          border-left: 2px solid red;
          border-right: 2px solid red;
        }
        .biaoti {
          width: 87%;
        }
        .kuang32 {
          width: 20%;
        }
        .kuang33{
          width: 37%;
          border-right: 2px solid red;
        }
        .kuang34{
          width: 36.5%;
          .qianming{
            height: 50px;
            width: 100px;
          }
        }
      }
      .wenjianbanli {
        border-bottom: 2px solid red;
        line-height: 50px;
        min-height: 50px;
        display: flex;
        .wenjianbanli1 {
          width: 13%;
          border-right: 2px solid red;
        }
        .wenjianbanli2 {
          color: #000000;
          width: 87%;
        }
      }
      .fujian {
        min-height: 50px;
        line-height: 50px;
        display: flex;
        .fujian1 {
          width: 13%;
          height: 100%;
        }
        .fujian2 {
          min-height: 50px;
          width: 87%;
          border-left: 2px solid red;
        }
      }
    }
  }
  
  .upload {
    margin-left: 35%;
    width: 30%;
  }
</style>
