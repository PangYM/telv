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
        <el-button type="primary" v-if="xiugai" @click="querenfasong(0)">保存</el-button>
        <el-button type="primary" v-if="tuiwen" @click="querentuiwen">退文至发起人</el-button>
        <el-button type="primary" v-if="tuiwen" @click="querenfanhui">退回上一级</el-button>
        <el-button type="primary" v-if="(quanxian<=20&&!pishi&&!yuedu)||ischehui" @click="querenchehui">撤回</el-button>
        <el-button type="primary" v-if="pishi" @click="querenshenpi">审批</el-button>
        <el-button type="primary" :loading="loading" @click="querensend">发送</el-button>
        <el-button type="primary" v-if="yuedu" @click="querenyuedu">办理</el-button>
        <el-button type="primary" v-if="!xiugai" @click="piyuejilu">查看批阅记录</el-button>
        <el-button type="primary" v-print="'#jieshou'">打印</el-button>
        <el-button type="primary" @click="guanbi(0)">关闭</el-button>
      </div>
      <div class="renyuan" v-if="istongxinlu">
        <tree-transfer class="tongxinlu" :title="title" :from_data="fromData" :to_data="toData" :defaultProps="{label:'label'}" @addBtn="add" @removeBtn="remove" :mode="mode" width="50%" height="500px" filter></tree-transfer>
        <el-button type="primary" @click="querenfasong(1)">确定发送</el-button>
        <el-button type="primary" @click="guanbi(1)">关闭</el-button>
      </div>
      <el-row class="rec_file" id="jieshou">
        <div class="bantou">
          广西铁路旅游传媒集团有限责任公司(
          <el-input v-if="xiugai" class="leixing" size="medium" v-model="form.leixing" placeholder></el-input>
          <a v-else style="color:#000000">{{form.leixing}}</a> )收文处理笺
        </div>
        <div class="bantou1">
          <div class="riqi">
            收文日期：
            <el-date-picker v-if="xiugai" value-format="yyyy-MM-dd" class="riqikuang" v-model="form.riqi" type="date" placeholder="选择日期"></el-date-picker>
            <a v-else style="color:#000000">{{form.riqi}}</a>
          </div>
          <div class="riqi">经办人：{{form.nigaoren}}</div>
          <div class="riqi">
            文种：
            <el-input v-if="xiugai" class="wenzhong" size="medium" v-model="form.wenzhong" placeholder></el-input>
            <a v-else style="color:#000000">{{form.wenzhong}}</a>
          </div>
        </div>
        <div class="kuang">
          <div class="kuang1">
            <div class="kuang11">来文标题</div>
            <div class="kuang12">
              <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.biaoti" placeholder></el-input>
              <a v-else style="color:#000000">{{form.biaoti}}</a>
            </div>
          </div>
          <div class="kuang2">
            <div class="kuang21">来文机关</div>
            <div class="kuang22">
              <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.jiguan" placeholder></el-input>
              <a v-else style="color:#000000">{{form.jiguan}}</a>
            </div>
            <div class="kuang23">来文编号</div>
            <div class="kuang24">
              <el-input v-if="xiugai" size="medium" v-model="form.bianhao" placeholder></el-input>
              <a v-else style="color:#000000">{{form.bianhao}}</a>
            </div>
          </div>
          <div class="kuang2">
            <div class="kuang21">缓急</div>
            <div class="kuang22">
              <el-select v-if="xiugai" size="mini" v-model="form.huanji" placeholder>
                <el-option label="普通" value="普通"></el-option>
                <el-option label="急件" value="急件"></el-option>
                <el-option label="特急" value="特急"></el-option>
              </el-select>
              <a v-else style="color:#000000">{{form.huanji}}</a>
            </div>
            <div class="kuang23">自编号</div>
            <div class="kuang24">
              <el-input v-if="xiugai" size="medium" v-model="form.zibianhao" placeholder></el-input>
              <a v-else style="color:#000000">{{form.zibianhao}}</a>
            </div>
          </div>
          <div class="kuang3">
            <div class="kuang31">附注说明</div>
            <div class="kuang32">
              <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.fuzhushuoming" placeholder></el-input>
              <a v-else style="color:#000000">{{form.fuzhushuoming}}</a>
            </div>
          </div>
          <div class="kuang4">
            <div class="kuang41">拟办意见</div>
            <div class="kuang42">
              <el-autocomplete v-if="hegao" v-model="form.nibanyijian.yijian" :fetch-suggestions="querySearch" placeholder="请输入意见" style="width:100%"></el-autocomplete>
              <a v-else style="color:#000000">{{form.nibanyijian.name}} {{form.nibanyijian.time}} {{form.nibanyijian.yijian}}</a>
            </div>
          </div>
          <div class="kuang4">
            <div class="kuang41">领导批示</div>
            <div class="kuang42">
              <li v-bind="form.lingdaopishilist" v-for="item in form.lingdaopishilist" :key="item.time">
                <a style="color:#000000">
                  <img v-if="item.imageurl" class="qianming" :src="getImgUrl(item.imageurl)">
                  <a v-else style="color:#000000">{{item.name}}</a> {{item.time}} {{item.yijian}}
                </a>
              </li>
              <el-autocomplete v-if="pishi" v-model="lingdaopishi" :fetch-suggestions="querySearch" placeholder="请输入批示" style="width:100%"></el-autocomplete>
            </div>
          </div>
          <div class="kuang4">
            <div class="kuang41">文件办理</div>
            <div class="kuang42">
              <li v-bind="form.qianyuelist" v-for="item in form.qianyuelist" :key="item.time">
                <a style="color:#000000">{{item.name}} {{item.time}} {{item.yijian}}</a>
              </li>
              <el-input v-if="yuedu" type="textarea" :autosize="true" v-model="banli" placeholder></el-input>
            </div>
          </div>
          <div class="fujian">
            <div class="fujian1">附件</div>
            <div class="fujian2">
              <li v-bind="form.fileList" v-for="item in form.fileList" :key="item.name">
                <a target="_blank" :href="baseurl+'/data/fujian/'+form.wendangid+'/'+item.name">{{item.name}}</a>
              </li>
            </div>
          </div>
          <div class="kuang3">
            <div class="kuang31">流程说明</div>
            <div class="kuang33">登记上传-> 拟办意见-> 领导审阅批示-> 文件办理-> 文件归档</div>
          </div>
        </div>
        <div v-if="xiugai" class="upload">
          <el-upload drag ref="upload" :action="baocunfujian" :on-success="onsuccess" :data="upload" :on-change="handlechange" :on-remove="handleremove" :file-list="form.fujianList" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将附件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </el-row>
    </div>
    <div v-else>
      <el-button type="primary" @click="piyuejilu">关闭</el-button>
      <div>
        <el-table border :data="weichulilist" stripe style="width: 100%;margin-top:30px;" :default-sort="{prop: 'tianshu', order: 'ascending'}">
          <el-table-column sortable prop="name" align="center" width="200" label="人员"></el-table-column>
          <el-table-column sortable prop="laiwentime" align="center" width="200" label="接收时间"></el-table-column>
          <el-table-column sortable prop="laiwenren" align="center" width="200" label="接收对象"></el-table-column>
          <el-table-column sortable prop="endtime" align="center" label="完成时间" width="200"></el-table-column>
          <el-table-column sortable prop="wancheng" align="center" label="完成状态" width="200"></el-table-column>
          <el-table-column sortable prop="tianshu"  align="center" label="超时天数" width="200"></el-table-column>
        </el-table>
      </div>
    </div>
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
      if (userdata.userid == 'wangting') this.ischehui = 1;
      this.quanxian = userdata.quanxian;
      if (this.$route.query.wendangid) {
        API.getwendangid({
          token: localStorage.getItem('token'),
          wendangid: this.$route.query.wendangid
        }).then(({
          data
        }) => {
          this.form = data.data;
          this.xiugai = data.xiugai;
          this.tuiwen = data.tuiwen;
          this.pishi = data.pishi;
          this.hegao = data.hegao;
          this.yuedu = data.yuedu;
          this.lingdaopishilist = data.lingdaopishilist;
          for (var i = 0; i < this.lingdaopishilist.length; ++i) {
            this.lingdaopishilist[i] = {
              'value': this.lingdaopishilist[i]
            }
          }
          this.upload.wendangid = this.form.wendangid;
          this.form.fujianList = [];
          for (var i = 0; i < this.form.fileList.length; ++i) {
            this.form.fujianList.push({
              name: this.form.fileList[i].name,
              url: this.baseurl + '/data/fujian/' + this.form.wendangid + '/' + this.form.fileList[i].name
            });
          }
          for (var userid in this.form.shenpihis) {
            var newshenpi=this.form.shenpihis[userid];
            var aaa = new Date();
            var bbb = new Date(this.form.shenpihis[userid]['laiwentime']);
            if (this.form.shenpihis[userid]['wancheng'] == 0) {
              newshenpi['tianshu']=parseInt((aaa.getTime() - bbb.getTime()) / 86400000);
            }
            else{
              newshenpi['tianshu']=0;
            }
            this.weichulilist.push(newshenpi);
          }
        });
      } else {
        API.getfawenhao().then(({
          data
        }) => {
          this.form.wendangid = data.wendangid + data.suiji;
          this.upload.wendangid = this.form.wendangid;
          this.form.nigaouserid = userdata.userid;
          this.form.nigaoren = userdata.name;
          if (userdata.quanxian == 30) this.hegao = 1;
        });
      }
      API.gettongxinlu({
        token: localStorage.getItem('token')
      }).then(({
        data
      }) => {
        this.fromData = data.tongxinlu;
      });
    },
    data() {
      return {
        ischehui: 0,
        quanxian: 50,
        xianshi: 1,
        xiugai: 1,
        hegao: 0,
        tuiwen: 0,
        pishi: 0,
        yuedu: 0,
        lingdaopishi: '',
        lingdaopishilist: [],
        banli: '',
        weichulilist:[],
        title: ['未选列表', '已选列表'],
        mode: 'transfer',
        istongxinlu: 0,
        fromData: [],
        toData: [],
        baseurl: API.base,
        loading: false,
        baocunfujian: API.baseurl + 'baocunfujian',
        upload: {},
        form: {
          doctype: 'shouwen',
          nigaouserid: '',
          zhuangtai: 'caogao',
          leixing: '',
          riqi: this.getToday(),
          nigaoren: '',
          wenzhong: '',
          biaoti: '',
          jiguan: '',
          bianhao: '',
          huanji: '',
          zibianhao: '',
          fuzhushuoming: '',
          shenpihis: {},
          liuchenglist: [],
          nibanyijian: {
            yijian: '',
            name: '',
            time: ''
          },
          lingdaopishilist: [],
          qianyuelist: [],
          fileList: [],
          fujianList: []
        }
      };
    },
    methods: {
      onsuccess(response, file, fileList){
        if(this.form.biaoti==''){
          this.form.biaoti=file.name.split('.')[0];
        }
      },
      querySearch(queryString, cb) {
        var results = queryString ? this.lingdaopishilist.filter(this.createFilter(queryString)) : this.lingdaopishilist;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      querenfanhui() {
        this.$confirm('确认退回上一级?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            API.fanhui({
              token: localStorage.getItem('token'),
              wendangid: this.form.wendangid,
              nibanyijian: this.form.nibanyijian,
              lingdaopishi: this.lingdaopishi,
              pishi: this.pishi
            }).then(({
              data
            }) => {
              localStorage.setItem('shuaxin', 0);
              this.$router.go(-1);
              this.$message({
                type: 'success',
                message: '退回上一级成功!',
                duration: 2000
              });
            });
          })
          .catch(() => {});
      },
      querenchehui() {
        this.$confirm('确认撤回?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            API.chehui({
              token: localStorage.getItem('token'),
              wendangid: this.form.wendangid
            }).then(({
              data
            }) => {
              this.hegao = 0;
              this.tuiwen = 0;
              this.xiugai = 0;
              this.pishi = 0;
              this.$message({
                type: 'success',
                message: '撤回成功!',
                duration: 2000
              });
              this.$router.go(0);
            });
          })
          .catch(() => {});
      },
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
      piyuejilu() {
        this.xianshi = 1 - this.xianshi;
      },
      querenyuedu() {
        API.yiyue({
          token: localStorage.getItem('token'),
          wendangid: this.form.wendangid,
          banli: this.banli
        }).then(({
          data
        }) => {
          this.form.qianyuelist = data.qianyuelist;
          if (this.istongxinlu == 0) {
            this.$message.success({
              showClose: true,
              message: this.form.zhuangtai != '退文' ? '办理成功！' : '已阅成功！',
              duration: 2000
            });
          }
          this.yuedu = 0;
        });
      },
      getImgUrl(imageurl) {
        return API.base + '/data/' + imageurl;
      },
      querensend() {
        this.istongxinlu = 1;
        if (this.yuedu) {
          this.querenyuedu();
        }
        if (this.pishi) {
          this.querenshenpi();
        }
      },
      guanbi(e) {
        if (e == 0) {
          localStorage.setItem('shuaxin', 0);
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
          })
          .then(() => {
            API.tuiwen({
              token: localStorage.getItem('token'),
              wendangid: this.form.wendangid,
              nibanyijian: this.form.nibanyijian,
              lingdaopishi: this.lingdaopishi,
              pishi: this.pishi
            }).then(({
              data
            }) => {
              localStorage.setItem('shuaxin', 0);
              this.$router.go(-1);
              this.$message({
                type: 'success',
                message: '退文成功!',
                duration: 2000
              });
            });
          })
          .catch(() => {});
      },
      querenshenpi() {
        API.pishi({
          token: localStorage.getItem('token'),
          wendangid: this.form.wendangid,
          pishi: this.pishi,
          lingdaopishi: this.lingdaopishi
        }).then(({
          data
        }) => {
          this.pishi = 0;
          this.form.lingdaopishilist = data.lingdaopishilist;
        });
        if (this.istongxinlu == 0) {
          this.$message.success({
            showClose: true,
            message: '审批成功',
            duration: 2000
          });
        }
      },
      querenfasong(e) {
        if (e && this.toData.length == 0) {
          this.$message({
            showClose: true,
            message: '请选择发送人',
            duration: 2000
          });
          return '';
        }
        this.loading = true;
        var fasongdata = {
          toData: this.toData,
          wendang: this.form,
          token: localStorage.getItem('token')
        };
        if (!e) fasongdata.toData = [];
        API.fasongwendang(fasongdata).then(({
          data
        }) => {
          this.loading = false;
          if (data.MSG == 'YES') {
            this.$message.success({
              showClose: true,
              message: e == 1 ? '发送成功' : '保存成功',
              duration: 2000
            });
            this.tongzhi = 0;
            if (e) {
              localStorage.setItem('shuaxin', 0);
              this.$router.go(-1);
            }
          } else {
            this.$message({
              message: '参数错误，请刷新后重试'
            });
          }
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

<style lang="scss">
  .shouwendengji {
    text-align: center;
    color: #ff0000;
  }
  .rec_file {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 30px;
    padding: 50px 0;
    text-align: center;
    .bantou {
      font-size: 24px;
      color: #ff0000;
      .leixing {
        width: 90px;
      }
    }
    .bantou1 {
      color: #ff0000;
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
      color: #ff0000;
      .kuang1 {
        line-height: 50px;
        min-height: 50px;
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
        min-height: 50px;
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
        min-height: 50px;
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
          color: #ff0000;
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
          .qianming {
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