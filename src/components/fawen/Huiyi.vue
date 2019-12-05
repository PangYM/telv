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
        <el-button type="primary" v-if="xiugai" @click="querenfasong(0)">保存</el-button>
        <el-button type="primary" v-if="tuiwen" @click="querentuiwen">退文至发起人</el-button>
        <el-button type="primary" v-if="tuiwen" @click="querenfanhui">退回上一级</el-button>
        <el-button type="primary" v-if="quanxian<=20&&!pishi&&!yuedu" @click="querenchehui">撤回</el-button>
        <el-button type="primary" v-if="(pishi==1||pishi==3||pishi==4)&&hegao!=1" @click="querenshenpi">审批</el-button>
        <el-button type="primary" v-if="fasong" :loading="loading" @click="querensend">发送</el-button>
        <el-button type="primary" v-if="yuedu" @click="querenyuedu">办理</el-button>
        <el-button type="primary" v-if="!xiugai" @click="piyuejilu">查看批阅记录</el-button>
        <el-button type="primary" v-print="'#huiyi'">打印</el-button>
        <el-button type="primary" @click="guanbi(0)">关闭</el-button>
      </div>
      <div class="renyuan" v-if="istongxinlu">
        <tree-transfer class="tongxinlu" :title="title" :from_data="fromData" :to_data="toData" :defaultProps="{label:'label'}" @addBtn="add" @removeBtn="remove" :mode="mode" width="50%" height="500px" filter></tree-transfer>
        <el-button type="primary" @click="querenfasong(1)">确定发送</el-button>
        <el-button type="primary" @click="guanbi(1)">关闭</el-button>
      </div>
      <el-row class="huiyi" id="huiyi">
        <div class="bantou">广西铁路旅游传媒集团有限责任公司会议纪要发文稿纸</div>
        <div class="riqi">
          日期：
          <el-date-picker v-if="xiugai" value-format="yyyy-MM-dd" v-model="form.riqi" type="date" placeholder="选择日期"></el-date-picker>
          <a v-else style="color:#000000">{{form.riqi}}</a>
        </div>
        <div class="kuang">
          <div class="kuang1">
            <div class="kuang11">
              <el-input class="bianhao" size="small" v-model="form.bianhao" placeholder></el-input>
            </div>
            <div class="kuang12">备注</div>
            <div class="kuang13">
              <el-input v-if="xiugai" class="bianhao" size="small" v-model="form.beizhu" placeholder></el-input>
              <a v-else style="color:#000000">{{form.beizhu}}</a>
            </div>
          </div>
          <div class="kuang2">
            <div class="kuang21">
              <div class="qianmingtou">签发：</div>
              <li v-bind="form.biglingdaolist" v-for="item in form.biglingdaolist" :key="item.name">
                <img class="qianming" :src="getImgUrl(item.imageurl)">
                <a style="color:#000000">{{item.time}} {{item.yijian}}</a>
              </li>
            </div>
            <div class="kuang21">
              <div class="qianmingtou">分管领导签阅：</div>
              <li v-bind="form.midlingdaolist" v-for="item in form.midlingdaolist" :key="item.name">
                <img class="qianming" :src="getImgUrl(item.imageurl)">
                <a style="color:#000000">{{item.time}} {{item.yijian}}</a>
              </li>
            </div>
            <div class="kuang22">
              <div class="qianmingtou">会签：</div>
              <li v-bind="form.minlingdaolist" v-for="item in form.minlingdaolist" :key="item.name">
                <a style="color:#000000">{{item.name}} {{item.time}} {{item.yijian}}</a>
              </li>
            </div>
          </div>
          <div class="kuang3" v-if="pishi">
            <div class="kuang30">领导批示</div>
            <div class="biaoti">
              <el-autocomplete v-model="lingdaopishi" :fetch-suggestions="querySearch" placeholder="请输入批示" style="width:100%"></el-autocomplete>
            </div>
          </div>
          <div class="kuang3">
            <div class="kuang30">标题</div>
            <div class="biaoti">
              <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.biaoti" placeholder></el-input>
              <a v-else style="color:#000000">{{form.biaoti}}</a>
            </div>
          </div>
          <div class="kuang4">
            <div class="kuang41">分送</div>
            <div class="zhusong">
              <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.zhusong" placeholder></el-input>
              <a v-else style="color:#000000">{{form.zhusong}}</a>
            </div>
          </div>
          <div class="kuang3">
            <div class="kuang30">拟稿人</div>
            <div class="kuang32">{{form.nigaoren}}</div>
            <div class="kuang31">拟稿单位</div>
            <div class="kuang32">{{form.nigaodanwei}}</div>
            <div class="kuang31">电话</div>
            <div class="kuang32">{{form.nigaorendianhua}}</div>
          </div>
          <div class="kuang3">
            <div class="kuang30">核稿人</div>
            <div class="kuang32">{{form.hegaoren}}</div>
            <div class="kuang31">核稿单位</div>
            <div class="kuang32">{{form.hegaodanwei}}</div>
            <div class="kuang31">电话</div>
            <div class="kuang32">{{form.hegaorendianhua}}</div>
          </div>
          <div class="kuang3">
            <div class="kuang30">打字</div>
            <div class="kuang32">
              <el-input v-if="xiugai" v-model="form.dazi" placeholder></el-input>
              <a v-else style="color:#000000">{{form.dazi}}</a>
            </div>
            <div class="kuang31">校对</div>
            <div class="kuang32">
              <el-input v-if="xiugai" v-model="form.jiaodui" placeholder></el-input>
              <a v-else style="color:#000000">{{form.dazi}}</a>
            </div>
            <div class="kuang31">份数</div>
            <div class="kuang32">
              <el-input v-if="xiugai" v-model="form.fenshu" placeholder></el-input>
              <a v-else style="color:#000000">{{form.fenshu}}</a>
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
          <div class="fengfa">
            二O
            <div style="width:40px"></div>年
            <div style="width:40px"></div>月
            <div style="width:40px"></div>日
            <div style="width:40px"></div>封发
          </div>
        </div>
      </el-row>
      <div v-if="xiugai" class="upload">
        <el-upload drag ref="upload" :action="baocunfujian" :on-success="onsuccess" :data="upload" :on-change="handlechange" :on-remove="handleremove" :file-list="form.fujianList" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将附件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div v-else>
      <el-button type="primary" @click="piyuejilu">关闭</el-button>
      <div>
        <el-table border :data="weichulilist" stripe style="width: 100%;margin-top:30px;" :default-sort="{prop: 'tianshu', order: 'descending'}">
          <el-table-column sortable prop="name" align="center" width="200" label="人员"></el-table-column>
          <el-table-column sortable prop="laiwentime" align="center" width="200" label="接收时间"></el-table-column>
          <el-table-column sortable prop="laiwenren" align="center" width="200" label="接收对象"></el-table-column>
          <el-table-column sortable prop="endtime" align="center" label="完成时间" width="200"></el-table-column>
          <el-table-column sortable prop="wancheng" align="center" label="完成状态" width="200"></el-table-column>
          <el-table-column sortable prop="tianshu" align="center" label="超时天数" width="200"></el-table-column>
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
    destroyed() {
      if (this.tongzhi) {
        API.tongzhidongyun({
          wendangid: this.form.wendangid,
          token: localStorage.getItem('token')
        }).then();
      }
    },
    mounted() {
      var userdata = JSON.parse(localStorage.getItem('userdata'));
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
          this.hegao = data.hegao;
          this.tuiwen = data.tuiwen;
          this.pishi = data.pishi;
          this.yuedu = data.yuedu;
          this.fasong = data.fasong;
          this.lingdaopishilist = data.lingdaopishilist;
          for (var i = 0; i < this.lingdaopishilist.length; ++i) {
            this.lingdaopishilist[i] = {
              'value': this.lingdaopishilist[i]
            }
          }
          this.upload.wendangid = this.form.wendangid;
          if (this.hegao) {
            this.form.hegaoren = userdata.name;
            this.form.hegaodanwei = userdata.group;
            this.form.hegaorendianhua = userdata.phone;
          }
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
          this.form.nigaodanwei = userdata.group;
          this.form.nigaorendianhua = userdata.phone;
          if (userdata.quanxian >= 28 && userdata.quanxian <= 30) {
            this.hegao = 1;
            this.form.hegaoren = userdata.name;
            this.form.hegaodanwei = userdata.group;
            this.form.hegaorendianhua = userdata.phone;
          }
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
        tongzhi: 0,
        quanxian: 50,
        xianshi: 1,
        xiugai: 1,
        hegao: 0,
        tuiwen: 0,
        pishi: 0,
        yuedu: 0,
        fasong: 1,
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
          doctype: 'huiyi',
          wendangid: '',
          nigaouserid: '',
          zhuangtai: 'caogao',
          leixing: '',
          riqi: this.getToday(),
          bianhao: '',
          huanji: '',
          biglingdaolist: [],
          midlingdaolist: [],
          minlingdaolist: [],
          falvlingdaolist: [],
          biaoti: '',
          zhusong: '',
          chaosong: '',
          nigaoren: '',
          nigaodanwei: '',
          nigaorendianhua: '',
          hegaoren: '',
          hegaodanwei: '',
          hegaorendianhua: '',
          nibanyijian: {
            yijian: '',
            name: '',
            time: ''
          },
          shenpihis: {},
          liuchenglist: [],
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
          bianhao: this.form.bianhao,
          banli: this.banli
        }).then(({
          data
        }) => {
          this.tongzhi = 1;
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
          this.form.biglingdaolist = data.biglingdaolist;
          this.form.midlingdaolist = data.midlingdaolist;
          this.form.minlingdaolist = data.minlingdaolist;
          this.form.falvlingdaolist = data.falvlingdaolist;
        });
        if (this.istongxinlu == 0) {
          this.tongzhi = 1;
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
        if (e && this.form.zhuangtai=='caogao' && this.toData.length >1) {
          this.$message({
            showClose: true,
            message: '请只选择你的上级',
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
  .huiyihuiyi {
    text-align: center;
    padding-bottom: 100px;
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
      color: #ff0000;
      .leixing {
        width: 90px;
      }
    }
    .riqi {
      margin-top: 10px;
      margin-left: 53%;
      color: #ff0000;
    }
    .kuang {
      margin-top: 10px;
      margin-left: 5%;
      width: 90%;
      border: 2px solid red;
      color: #ff0000;
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
        .qianmingtou {
          width: 100%;
        }
        .qianming {
          height: 50px;
          width: 100px;
        }
      }
      .kuang3 {
        min-height: 50px;
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
        min-height: 50px;
        line-height: 50px;
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
      .wenjianbanli {
        border-bottom: 2px solid red;
        line-height: 50px;
        min-height: 50px;
        display: flex;
        .wenjianbanli1 {
          width: 12%;
          border-right: 2px solid red;
        }
        .wenjianbanli2 {
          color: #000000;
          width: 88%;
          .qianming {
            height: 50px;
            width: 100px;
          }
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
      .fengfa {
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
