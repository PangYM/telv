<template>
  <div class="huiyihuiyi">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">公文发文</el-breadcrumb-item>
          <el-breadcrumb-item>会议发文</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <div v-if="xianshi">
    <div class="dayin">
      <el-button type="primary" v-if="xiugai" :loading="loading" @click="querenfasong(0)">保存</el-button>
      <el-button type="primary" v-if="tuiwen" @click="querentuiwen">退文至发起人</el-button>
      <el-button type="primary" v-if="pishi" @click="querenshenpi">审批</el-button>
      <el-button type="primary" v-if="!pishi" @click="querensend">发送</el-button>
      <el-button type="primary" v-if="yuedu" @click="querenyuedu">办理</el-button>
      <el-button type="primary" v-if="!xiugai" @click="piyuejilu">查看批阅记录</el-button>
      <el-button type="primary" v-print="'#huiyi'">打印</el-button>
      <el-button type="primary" @click="guanbi(0)">关闭</el-button>
    </div>
    <div class="renyuan" v-if="istongxinlu">
      <tree-transfer class="tongxinlu" :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' width="50%" height="500px" filter>
      </tree-transfer>
      <el-button type="primary" @click="querenfasong(1)">确定发送</el-button>
      <el-button type="primary" @click="guanbi(1)">关闭</el-button>
    </div>
    <el-row class="huiyi" id="huiyi">
      <div class="bantou">中国铁路南宁局集团有限公司会议纪要发文稿纸
  
      </div>
      <div class="riqi">日期：
        <el-date-picker v-if="xiugai" v-model="form.riqi" type="date" placeholder="选择日期">
        </el-date-picker>
        <a v-else style="color:#000000">{{form.riqi}}</a>
      </div>
      <div class="kuang">
        <div class="kuang1">
          <div class="kuang11">
            <el-input v-if="xiugai" class="bianhao" size="small" v-model="form.bianhao" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.bianhao}}</a>号
          </div>
          <div class="kuang12">
            备注
          </div>
          <div class="kuang13">
            <el-input v-if="xiugai" class="bianhao" size="small" v-model="form.beizhu" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.beizhu}}</a>
          </div>
        </div>
        <div class="kuang2">
          <div class="kuang21">
            <div class="qianmingtou">
            签发：
            </div>
            <li v-bind="form.biglingdaolist" v-for="item in form.biglingdaolist" :key="item.name">
              <img class="qianming" :src="getImgUrl(item.imageurl)"/> <a style="color:#000000">{{item.time}}</a>
            </li>
          </div>
          <div class="kuang21">
            <div class="qianmingtou">
            分管领导签阅：
            </div>
            <li v-bind="form.midlingdaolist" v-for="item in form.midlingdaolist" :key="item.name">
              <img class="qianming" :src="getImgUrl(item.imageurl)"/> <a style="color:#000000">{{item.time}}</a>
            </li>
          </div>
          <div class="kuang22">
            <div class="qianmingtou">
            会签：
            </div>
            <li v-bind="form.minlingdaolist" v-for="item in form.minlingdaolist" :key="item.name">
              <img class="qianming" :src="getImgUrl(item.imageurl)"/> <a style="color:#000000">{{item.time}}</a>
            </li>
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
        <div class="kuang4">
          <div class="kuang41">
            主送
          </div>
          <div class="zhusong">
            <el-input v-if="xiugai" type="textarea" rows="3" v-model="form.zhusong" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.zhusong}}</a>
          </div>
        </div>
        <div class="kuang4">
          <div class="kuang41">
            抄送
          </div>
          <div class="zhusong">
            <el-input v-if="xiugai" type="textarea" rows="3" v-model="form.chaosong" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.chaosong}}</a>
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
        <div class="kuang3">
          <div class="kuang30">
            核稿人
          </div>
          <div class="kuang32">
            {{form.hegaoren}}
          </div>
          <div class="kuang31">
            核稿单位
          </div>
          <div class="kuang32">
            {{form.hegaodanwei}}
          </div>
          <div class="kuang31">
            电话
          </div>
          <div class="kuang32">
            {{form.hegaorendianhua}}
          </div>
        </div>
        <div class="kuang3">
          <div class="kuang30">
            打字
          </div>
          <div class="kuang32">
            <el-input v-if="xiugai"  v-model="form.dazi" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.dazi}}</a>
          </div>
          <div class="kuang31">
            校对
          </div>
          <div class="kuang32">
            <el-input v-if="xiugai"  v-model="form.jiaodui" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.dazi}}</a>
          </div>
          <div class="kuang31">
            分数
          </div>
          <div class="kuang32">
            <el-input v-if="xiugai"  v-model="form.fenshu" placeholder=""></el-input>
            <a v-else style="color:#000000">{{form.fenshu}}</a>
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
        <div class="fengfa">
          二O<div style="width:40px"> </div>年<div style="width:40px"> </div>月<div style="width:40px"> </div>日<div style="width:40px"> </div>封发
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
          this.hegao = data.hegao;
          this.tuiwen = data.tuiwen;
          this.pishi = data.pishi;
          this.yuedu=data.yuedu;
          this.upload.wendangid = this.form.wendangid;
          if (this.xiugai == 0) {
            this.form.riqi = this.form.riqi.slice(0, 10);
          }
          if (this.hegao){
            this.form.hegaoren = userdata.name;
            this.form.hegaodanwei = userdata.group;
            this.form.hegaorendianhua = userdata.phone;
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
    },
    data() {
      return {
        xianshi:1,
        xiugai: 1,
        hegao: 0,
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
          doctype: 'huiyi',
          wendangid: '',
          nigaoid:'',
          zhuangtai:'caogao',
          leixing: '',
          riqi: '',
          bianhao: '',
          huanji: '',
          biglingdaolist:[],
          midlingdaolist:[],
          minlingdaolist:[],
          falvlingdaolist:[],
          biaoti: '',
          zhusong: '',
          chaosong: '',
          nigaoren: '',
          nigaodanwei: '',
          nigaorendianhua: '',
          hegaoren: '',
          hegaodanwei: '',
          hegaorendianhua: '',
          shenpihis:{},
          liuchenglist:[],
          fileList: [],
          fujianList: [],
        },
      }
    },
    methods: {
      piyuejilu(){
        this.xianshi=1-this.xianshi;
      },
      querenyuedu(){
        API.yiyue({
          'token': localStorage.getItem('token'),
          'wendangid': this.$route.query.wendangid
        }).then(({
          data
        }) => {
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
        API.gettongxinlu()
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
          this.hegao = 0;
          this.tuiwen = 0;
          this.xiugai = 0;
          this.pishi = 0;
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
  .huiyihuiyi {
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
  
  .huiyi {
    margin-left: 5%;
    width: 90%;
    .bantou {
      padding-top: 50px;
      width: 100%;
      font-size: 25px;
      text-align: center;
      color: #FF0000;
      .leixing {
        width: 90px;
      }
    }
    .riqi {
      margin-top: 10px;
      margin-left: 53%;
      color: #FF0000;
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
        border-bottom: 2px solid red;
        .kuang11 {
          width: 50%;
          border-right: 2px solid red;
          .bianhao {
            width: 300px;
          }
        }
        .kuang12 {
          width: 10%;
          border-right: 2px solid red;
        }
        .kuang13 {
          width: 39.5%;
        }
      }
      .kuang2 {
        min-height: 150px;
        border-bottom: 2px solid red;
        display: flex;
        .kuang21 {
          display: block;
          width: 33.3%;
          border-right: 2px solid red;
        }
        .kuang22 {
          display: block;
          width: 33.3%;
        }
        .qianmingtou{
          width: 100%;
        }
        .qianming{
          height: 50px;
          width: 100px;
        }
      }
      .kuang3 {
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid red;
        display: flex;
        .kuang30 {
          width: 12%;
          border-right: 2px solid red;
        }
        .kuang31 {
          width: 12%;
          border-left: 2px solid red;
          border-right: 2px solid red;
        }
        .biaoti {
          width: 88%;
        }
        .kuang32 {
          width: 21%;
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
          width: 87.5%;
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
      .fengfa{
        display: flex;
        padding-left: 70%;
        border-top: 2px solid red;
        line-height: 50px;
      }
    }
  }
  
  .upload {
    margin-left: 35%;
    width: 30%;
  }
</style>
