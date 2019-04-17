<template>
  <div class="gongwengongwen">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">公文发文</el-breadcrumb-item>
          <el-breadcrumb-item>公文印发单</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div v-if="xianshi">
    <div class="dayin">
      <el-button type="primary" v-if="xiugai" :loading="loading" @click="querenfasong(0)">保存</el-button>
      <el-button type="primary" v-if="yuedu" @click="querenyuedu">已阅</el-button>
      <el-button type="primary" @click="querensend">发送</el-button>
      <el-button type="primary" v-if="!xiugai" @click="piyuejilu">查看批阅记录</el-button>
      <el-button type="primary" v-print="'#gongwen'">打印</el-button>
      <el-button type="primary" @click="guanbi(0)">关闭</el-button>
    </div>
    <div class="renyuan" v-if="istongxinlu">
      <tree-transfer class="tongxinlu" :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' width="50%" height="500px" filter>
      </tree-transfer>
      <el-button type="primary" @click="querenfasong(1)">确定发送</el-button>
      <el-button type="primary" @click="guanbi(1)">关闭</el-button>
    </div>
    <el-row class="gongwen" id="gongwen">
      <div class="bantou">广西铁路旅游传媒集团有限责任公司(
        <el-input v-if="xiugai" class="leixing" size="medium" v-model="form.leixing" placeholder=""></el-input>
        <a v-else style="color:#000000">{{form.leixing}}</a> 
        )公文印发单
  
      </div>
      <div class="kuang">
        <div class="kuang1">
          <div class="kuang11">
            来文标题
          </div>
          <div class="kuang12">
          <el-input v-if="xiugai" v-model="form.biaoti" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.biaoti}}</a> 
          </div>
        </div>
        <div class="kuang2">
          <div class="kuang21">
            发文字号
          </div>
          <div class="kuang22">
          <el-input v-if="xiugai" v-model="form.fawenzihao" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.fawenzihao}}</a> 
          </div>
          <div class="kuang23">
            制发单号
          </div>
          <div class="kuang24">
          <el-input v-if="xiugai" v-model="form.zhifadanhao" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.zhifadanhao}}</a> 
          </div>
        </div>
        <div class="kuang1">
          <div class="kuang11">
            主送机关
          </div>
          <div class="kuang12">
          <el-input v-if="xiugai" v-model="form.zhusongjiguan" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.zhusongjiguan}}</a> 
          </div>
        </div>
        <div class="kuang1">
          <div class="kuang11">
            抄送机关
          </div>
          <div class="kuang12">
          <el-input v-if="xiugai" v-model="form.chaosongjiguan" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.chaosongjiguan}}</a> 
          </div>
        </div>
        <div class="kuang1">
          <div class="kuang11">
            主办部门
          </div>
          <div class="kuang12">
          <el-input v-if="xiugai" v-model="form.zhubanbumen" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.zhubanbumen}}</a> 
          </div>
        </div>
        <div class="kuang2">
          <div class="kuang21">
            拟稿人
          </div>
          <div class="kuang22">{{form.nigaoren}}</div>
          <div class="kuang23">
            签发单号
          </div>
          <div class="kuang24">
          <el-input v-if="xiugai" v-model="form.qianfadanhao" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.qianfadanhao}}</a> 
          </div>
        </div>
        <div class="kuang2">
          <div class="kuang21">
            签发人
          </div>
          <div class="kuang22">
          <el-input v-if="xiugai" v-model="form.qianfaren" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.qianfaren}}</a> 
          </div>
          <div class="kuang23">
            签发日期
          </div>
          <div class="kuang24">
          <el-date-picker v-if="xiugai" value-format="yyyy-MM-dd" v-model="form.qianfariqi" type="date" placeholder=" 签发日期">
          </el-date-picker>
          <a v-else style="color:#000000">{{form.qianfariqi}}</a> 
          </div>
        </div>
        <div class="kuang2">
          <div class="kuang21">
            校印人
          </div>
          <div class="kuang22">
          <el-input v-if="xiugai" v-model="form.xiaoyinren" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.xiaoyinren}}</a> 
          </div>
          <div class="kuang23">
            制发日期
          </div>
          <div class="kuang24">
          <el-date-picker v-if="xiugai" value-format="yyyy-MM-dd" v-model="form.zhifariqi" type="date" placeholder="制发日期">
          </el-date-picker>
          <a v-else style="color:#000000">{{form.zhifariqi}}</a> 
          </div>
        </div>
        <div class="kuang1">
          <div class="kuang11">
            制发说明
          </div>
          <div class="kuang12">
          <el-input v-if="xiugai" v-model="form.zhifashuoming" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.zhifashuoming}}</a> 
          </div>
        </div>
        <div class="kuang1">
          <div class="kuang11">
            收文签阅
          </div>
          <div class="kuang12">
          <li v-bind="form.qianyuelist" v-for="item in form.qianyuelist" :key="item.name">
              <a style="color:#000000">已阅 {{item.name}} {{item.time}}</a>
              </li>
            </div>
        </div>
        <div class="fujian">
          <div class="fujian1">
            附件
          </div>
          <div class="fujian2">
            <li v-bind="form.fileList" v-for="item in form.fileList" :key="item.name">
              <a target="_blank" :href="baseurl+'/data/fujian/'+form.bianhao+'/'+item.name">
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
    <el-table border :data="shenyuejilu" stripe style="width: 100%;margin-top:30px;" :default-sort = "{prop: 'caozuo', order: 'descending'}">
      <el-table-column sortable prop="name" align="center" width="200" label="人员">
      </el-table-column>
      <el-table-column sortable prop="laiwenren" align="center" min-width="250" show-overflow-tooltip label="来文人">
      </el-table-column>
      <el-table-column sortable prop="laiwentime" align="center" label="来文时间" width="200">
      </el-table-column>
      <el-table-column sortable prop="endtime" align="center" width="200" label="结束时间">
      </el-table-column>
      <el-table-column sortable prop="caozuo" fixed="right" align="center" min-width="250" show-overflow-tooltip label="操作">
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
    created() {
      var userdata = JSON.parse(localStorage.getItem('userdata'));
      if (this.$route.query.wendangid) {
        API.getwendangid({
          'token': localStorage.getItem('token'),
          'wendangid': this.$route.query.wendangid
        }).then(({
          data
        }) => {
          this.form = data.data;
          this.xiugai = data.xiugai;
          this.yuedu = data.yuedu;
          this.upload.wendangid = this.form.wendangid;
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
        });
      }
    },
    data() {
      return {
        shenyuejilu:[],
        xianshi:1,
        istongxinlu: 0,
        xiugai:1,
        yuedu:0,
        title: ['未选列表', '已选列表'],
        mode: "transfer",
        fromData: [],
        toData: [],
        baseurl: API.base,
        loading: false,
        baocunfujian: API.baseurl + 'baocunfujian',
        upload: {},
        form: {
          doctype:'gongwen',
          nigaoid:'',
          zhuangtai:'caogao',
          wendangid:'',
          leixing: '',
          biaoti: '',
          fawenzihao: '',
          zhifadanhao: '',
          zhusongjiguan: '',
          chaosongjiguan: '',
          zhubanbumen: '',
          nigaoren: '',
          qianfadanhao: '',
          qianfaren:'',
          qianfariqi: this.getToday(),
          xiaoyinren:'',
          zhifariqi: this.getToday(),
          zhifashuoming: '',
          shenpihis:{},
          liuchenglist:[],
          qianyuelist: [],
          fileList: [],
          fujianList: [],
        },
      }
    },
    methods: {
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
        this.shenyuejilu=[];
        for(var i in this.form.shenpihis){
          this.shenyuejilu.push(this.form.shenpihis[i]);
        }
      },
      querenyuedu(){
        API.yiyue({
          'token': localStorage.getItem('token'),
          'wendangid': this.form.wendangid
        }).then(({
          data
        }) => {
          this.form.qianyuelist=data.qianyuelist;
          this.$message.success({
                showClose: true,
                message: '已阅！',
                duration: 2000
              });
          this.yuedu=0;
        });
      },
      querensend() {
        this.istongxinlu = 1;
        API.gettongxinlu({'token': localStorage.getItem('token')})
          .then(({
            data
          }) => {
            this.fromData = data.tongxinlu;
          });
      },
      guanbi(e) {
        if (e == 0) {
          this.$router.go(-1);
        } else {
          this.istongxinlu = 0;
        }
      },
      querenfasong(e) {
        if(e&&this.toData.length==0){
          this.$message({
            showClose: true,
            message: '请选择发送人',
            duration: 2000
          });
          return "";
        }
        this.loading = true;
        this.form.bianhao = this.form.bianhao1 + '【' + this.form.bianhao2 + '】' + this.form.bianhao3 + '号';
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
              duration: 2000
            });
            if(e)
              this.$router.push({
            path: '/main',
          });
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
  .gongwengongwen {
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
  
  .gongwen {
    margin-left: 5%;
    width: 90%;
    .bantou {
      padding-top: 50px;
      padding-bottom: 20px;
      width: 100%;
      font-size: 25px;
      color: #FF0000;
      text-align: center;
      .leixing {
        width: 90px;
      }
    }
    .kuang {
      margin-top: 10px;
      margin-left: 5%;
      width: 90%;
      border: 2px solid red;
      color: #FF0000;
      .kuang1 {
        line-height: 50px;
        min-height: 50px;
        border-bottom: 2px solid red;
        display: flex;
        .kuang11 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang12 {
          width: 88%;
        }
      }
      .kuang2 {
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid red;
        display: flex;
        .kuang21 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang22 {
          width: 38%;
          border-right: 2px solid red;
        }
        .kuang23 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang24 {
          width: 37.5%;
        }
      }
      .kuang3 {
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid red;
        display: flex;
        .kuang31 {
          width: 12%;
          border-right: 2px solid red;
        }
        .biaoti {
          width: 88%;
        }
        .chaogaodanwei {
          border-right: 2px solid red;
          width: 21.3%;
        }
        .chaogaodanwei1 {
          width: 21.3%;
        }
      }
      .kuang4 {
        height: 80px;
        line-height: 80px;
        border-bottom: 2px solid red;
        display: flex;
        .kuang41 {
          width: 12%;
          border-right: 2px solid red;
        }
        .zhusong {
          width: 88%;
        }
      }
      .fujian {
        min-height: 50px;
        line-height: 50px;
        display: flex;
        .fujian1 {
          width: 12%;
          height: 100%;
        }
        .fujian2 {
          min-height: 50px;
          width: 88%;
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
