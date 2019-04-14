<template>
  <div class="shouwendengji">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公文收文</el-breadcrumb-item>
          <el-breadcrumb-item>收文登记</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div v-if="xianshi">
    <div class="dayin">
      <el-button type="primary" v-if="xiugai" :loading="loading" @click="querenfasong(0)">保存</el-button>
      <el-button type="primary" v-if="tuiwen" @click="querentuiwen">退文至发起人</el-button>
      <el-button type="primary" v-if="pishi" @click="querenshenpi">审批</el-button>
      <el-button type="primary" v-else @click="querensend">发送</el-button>
      <el-button type="primary" v-if="yuedu" @click="querenyuedu">办理</el-button>
      <el-button type="primary" v-if="!xiugai" @click="piyuejilu">查看批阅记录</el-button>
      <el-button type="primary" v-print="'#jieshou'">打印</el-button>
      <el-button type="primary" @click="guanbi(0)">关闭</el-button>
    </div>
    <div class="renyuan" v-if="istongxinlu">
      <tree-transfer class="tongxinlu" :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' width="50%" height="500px" filter>
      </tree-transfer>
      <el-button type="primary" @click="querenfasong(1)">确定发送</el-button>
      <el-button type="primary" @click="guanbi(1)">关闭</el-button>
    </div>
    <el-row class="rec_file" id="jieshou">
      <div class="bantou">广西铁路旅游传媒集团有限责任公司(
        <el-input v-if="xiugai" class="leixing" size="medium" v-model="form.leixing" placeholder=""></el-input>
        <a v-else style="color:#000000">{{form.leixing}}</a> )收文处理笺
      </div>
      <div class="bantou1">
        <div class="riqi">收文日期：
          <el-date-picker v-if="xiugai" value-format="yyyy-MM-dd" class="riqikuang" v-model="form.riqi" type="date" placeholder="选择日期">
          </el-date-picker>
          <a v-else style="color:#000000">{{form.riqi}}</a>
        </div>
        <div class="riqi">经办人：{{form.nigaoren}}
        </div>
        <div class="riqi">文种：
          <el-input v-if="xiugai" class="wenzhong" size="medium" v-model="form.wenzhong" placeholder=""></el-input>
          <a v-else style="color:#000000">{{form.wenzhong}}</a>
        </div>
      </div>
      <div class="kuang">
        <div class="kuang1">
          <div class="kuang11">
            来文标题
          </div>
          <div class="kuang12">
            <el-input v-if="xiugai" size="medium" v-model="form.biaoti" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.biaoti}}</a>
          </div>
        </div>
        <div class="kuang2">
          <div class="kuang21">
            来文机关
          </div>
          <div class="kuang22">
            <el-input v-if="xiugai" size="medium" v-model="form.jiguan" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.jiguan}}</a>
          </div>
          <div class="kuang23">
            来文编号
          </div>
          <div class="kuang24">
            <el-input v-if="xiugai" size="medium" v-model="form.bianhao" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.bianhao}}</a>
          </div>
        </div>
        <div class="kuang2">
          <div class="kuang21">
            缓急
          </div>
          <div class="kuang22">
            <el-select v-if="xiugai" size="mini" v-model="form.huanji" placeholder="">
            <el-option label="普通" value="普通"></el-option>
            <el-option label="急件" value="急件"></el-option>
            <el-option label="特急" value="特急"></el-option>
          </el-select>
          <a v-else style="color:#000000">{{form.huanji}}</a>
          </div>
          <div class="kuang23">
            自编号
          </div>
          <div class="kuang24">
            <el-input v-if="xiugai" size="medium" v-model="form.zibianhao" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.zibianhao}}</a>
          </div>
        </div>
        <div class="kuang3">
          <div class="kuang31">
            附注说明
          </div>
          <div class="kuang32">
            <el-input v-if="xiugai" size="medium" v-model="form.fuzhushuoming" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.fuzhushuoming}}</a>
          </div>
        </div>
        <div class="kuang4">
          <div class="kuang41">
            拟办意见
          </div>
          <div class="kuang42">
            <el-input v-if="hegao" size="medium" type="textarea" rows="4" v-model="form.nibanyijian.yijian" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.nibanyijian.yijian}} {{form.nibanyijian.name}} {{form.nibanyijian.time}}</a>
          </div>
        </div>
        <div class="kuang4">
          <div class="kuang41">
            领导批示
          </div>
          <div class="kuang42">
            <li v-bind="form.lingdaopishilist" v-for="item in form.lingdaopishilist" :key="item.time">
              <a style="color:#000000">
                {{item.yijian}} <img class="qianming" :src="getImgUrl(item.imageurl)"/> {{item.time}}
                </a>
            </li>
            <el-input v-if="pishi" size="medium" v-model="form.lingdaopishi" placeholder=""></el-input>
          </div>
        </div>
        <div class="kuang4">
          <div class="kuang41">
            文件办理
          </div>
          <div class="kuang42">
            <li v-bind="form.qianyuelist" v-for="item in form.qianyuelist" :key="item.name">
              <a style="color:#000000">{{item.name}} {{item.time}}</a>
              </li>
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
        <div class="kuang3">
          <div class="kuang31">
            流程说明
          </div>
          <div class="kuang33">
            登记上传-> 拟办意见-> 领导审阅批示-> 文件办理-> 文件归档
          </div>
        </div>
      </div>
      <div v-if="xiugai" class="upload">
      <el-upload drag ref="upload" :action="baocunfujian" :data="upload" :on-change="handlechange" :on-remove="handleremove" :file-list="form.fujianList" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将附件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    </el-row>
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
          this.tuiwen = data.tuiwen;
          this.pishi = data.pishi;
          this.hegao = data.hegao;
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
          if(userdata.quanxian==30)
            this.hegao=1;
        });
      }
    },
    data() {
      return {
        xianshi:1,
        xiugai: 1,
        hegao:0,
        tuiwen: 0,
        pishi:0,
        yuedu:0,
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
          doctype:'shouwen',
          nigaoid:'',
          zhuangtai:'caogao',
          leixing: '',
          riqi: new Date().toLocaleString().slice(0,10),
          nigaoid:'',
          nigaoren: '',
          wenzhong:'',
          biaoti: '',
          jiguan: '',
          bianhao: '',
          huanji:'',
          zibianhao:'',
          fuzhushuoming: '',
          shenpihis:{},
          liuchenglist:[],
          nibanyijian:{
            yijian:'',
            name:'',
            time:'',
          },
          lingdaopishi:'',
          lingdaopishilist:[],
          qianyuelist:[],
          fileList: [],
          fujianList: [],
        }
      };
    },
    methods: {
      piyuejilu(){
        this.xianshi=1-this.xianshi;
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
                message: '办理成功！',
                duration: 2000
              });
          this.yuedu=0;
        });
      },
      getImgUrl(imageurl){
        return API.base+'/data/'+imageurl;
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
      querentuiwen() {
        this.$confirm('确认退文至发起人?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tuiwen = 0;
          this.xiugai = 0;
          this.pishi = 0;
          this.yuedu = 0;
          API.tuiwen({
            'token': localStorage.getItem('token'),
            'wendangid': this.form.wendangid,
          }).then(({
            data
          }) => {});
          this.$message({
            type: 'success',
            message: '退文成功!'
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
            'lingdaopishi':this.form.lingdaopishi,
          }).then(({
            data
          }) => {
            this.pishi=0;
            this.form.lingdaopishilist=data.lingdaopishilist;
          });
          this.$message.success({
                showClose: true,
                message: '审批成功',
                duration: 2000
              });
        })
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
  .shouwendengji {
    text-align: center;
    color: #FF0000;
  }
  
  .rec_file {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 30px;
    padding: 50px 0;
    text-align: center;
    .bantou {
      font-size: 24px;
      color: #FF0000;
      .leixing {
        width: 90px;
      }
    }
    .bantou1 {
      color: #FF0000;
      text-align: center;
      display: flex;
      justify-content: space-around;
      .riqi {
        height: 50px;
        line-height: 50px;
        .riqikuang {
          width: 140px;
        }
        .wenzhong {
          width: 90px;
        }
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
        height: 50px;
        display: flex;
        .kuang11 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang12 {
          color: #000000;
          width: 88%;
        }
      }
      .kuang2 {
        border-top: 2px solid red;
        line-height: 50px;
        height: 50px;
        display: flex;
        .kuang21 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang22 {
          color: #000000;
          border-right: 2px solid red;
          width: 38%;
        }
        .kuang23 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang24 {
          color: #000000;
          width: 37.5%;
        }
      }
      .kuang3 {
        border-top: 2px solid red;
        line-height: 50px;
        height: 50px;
        display: flex;
        .kuang31 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang32 {
          color: #000000;
          width: 88%;
        }
        .kuang33 {
          color: #FF0000;
          width: 88%;
        }
      }
      .kuang4 {
        border-top: 2px solid red;
        line-height: 50px;
        min-height: 50px;
        display: flex;
        .kuang41 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang42 {
          color: #000000;
          width: 88%;
          .qianming{
          height: 50px;
          width: 100px;
        }
        }
      }
      .fujian {
        border-top: 2px solid red;
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
