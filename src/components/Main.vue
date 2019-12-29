<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row class="oa_main_card">
      <el-col :span="4">
        <el-card style="background:#67C23A;">
          <div class="todo_l">
            <el-row>
              <el-col :span="16" class="tl">
                <span>我的督办</span>
              </el-col>
              <el-col :span="8" class="tr">
                <el-button type="text" @click="handleGoUrl('/bangongguanli/dubanguanli')">
                  <i>{{duban}}</i>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="background:#E6A23C;">
          <div class="todo_l">
            <el-row>
              <el-col :span="16" class="tl">
                <span>我的汇报</span>
              </el-col>
              <el-col :span="8" class="tr">
                <el-button type="text" @click="handleGoUrl('/bangongguanli/huibaoguanli')">
                  <i>{{huibao}}</i>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="background:#409EFF;">
          <div class="todo_l">
            <el-row>
              <el-col :span="16" class="tl">
                <span>未读邮件</span>
              </el-col>
              <el-col :span="8" class="tr">
                <el-button type="text" @click="handleGoUrl('/youjian/yishouyoujian')">
                  <i>{{youjian}}</i>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="background:#F56C6C;">
          <div class="todo_l">
            <el-row>
              <el-col :span="16" class="tl">
                <span>提醒待办</span>
              </el-col>
              <el-col :span="8" class="tr">
                <el-button type="text" @click="handleGoUrl('/bangongguanli/tixingguanli')">
                  <i>{{tixing}}</i>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="background:#FFDD00;">
          <div class="todo_l">
            <el-row>
              <el-col :span="16" class="tl">
                <span>发文督办</span>
              </el-col>
              <el-col :span="8" class="tr">
                <el-button v-if="userdata.userid=='wubo'" type="text" @click="handleGoUrl('/fawen/fawenduban')">
                  <i>{{fawenduban}}</i>
                </el-button>
                <el-button v-else type="text" @click="handleGoUrl('/fawen/daibanfawen')">
                  <i>{{fawenduban}}</i>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="background:#FF00FF;">
          <div class="todo_l">
            <el-row>
              <el-col :span="16" class="tl">
                <span>收文督办</span>
              </el-col>
              <el-col :span="8" class="tr">
                <el-button v-if="userdata.userid=='wubo'" type="text" @click="handleGoUrl('/shouwen/shouwenduban')">
                  <i>{{shouwenduban}}</i>
                </el-button>
                <el-button v-else type="text" @click="handleGoUrl('/shouwen/daibanshouwen')">
                  <i>{{shouwenduban}}</i>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="oa_doc">
      <el-col :span="12">
        <el-card class="box-card">
          <el-carousel class="toubanimg" indicator-position="none" :interval="2000" arrow="always">
            <el-carousel-item class="toubanimg" v-for="item in lunbotulist" :key="item.url" style="background:rgba(0,0,0,0)">
              <img :src="base+item.url" @click="showcontent(item.content)" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">
                              <i class="iconfont icon-remind1"></i> 通知公告
                            </span>
            <el-tooltip class="item" effect="dark" content="查看更多" placement="top-start">
              <i class="el-icon-more-outline" style="float: right; padding: 3px 0" @click="handleGoUrl('/bangongguanli/gonggaoguanli')"></i>
            </el-tooltip>
          </div>
          <div>
            <el-table :data="gonggao" stripe style="width: 100%">
              <el-table-column prop="biaoti" align="center" label="标题" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                                  <div @click="handleEdit(0, scope.row)">
                                    <a v-if="scope.row.weidu" :style="{'color': '#008B00'}">{{scope.row.biaoti}}</a>
                                    <a v-else :style="{'color': '#000000'}">{{scope.row.biaoti}}</a>
                                  </div>
</template>
              </el-table-column>
              <el-table-column prop="nigaoren" align="center" label="发起人" width="100"></el-table-column>
              <el-table-column
                prop="starttime"
                align="center"
                label="发起时间"
                width="100"
                show-overflow-tooltip
                fixed="right"
              ></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="oa_doc">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">
              <i class="iconfont icon-inquirytemplate"></i> 待办发文
            </span>
            <el-tooltip class="item" effect="dark" content="查看更多" placement="top-start">
              <i
                class="el-icon-more-outline"
                style="float: right; padding: 3px 0"
                @click="handleGoUrl('/fawen/daibanfawen')"
              ></i>
            </el-tooltip>
          </div>
          <div>
            <el-table :data="daibanfawen" stripe style="width: 100%">
              <el-table-column
                prop="biaoti"
                align="center"
                label="发文标题"
                show-overflow-tooltip
                min-width="150"
              >
<template slot-scope="scope">
  <div @click="handleEdit(1, scope.row)">
    {{scope.row.biaoti}}</div>
</template>
              </el-table-column>
              <el-table-column prop="laiwenren" align="center" label="来文人" width="100"></el-table-column>
              <el-table-column
                prop="starttime"
                align="center"
                label="发文时间"
                width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="zhuangtai" align="center" label="状态" width="100" fixed="right"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">
              <i class="iconfont icon-inquirytemplate"></i> 待办收文
            </span>
            <el-tooltip class="item" effect="dark" content="查看更多" placement="top-start">
              <i
                class="el-icon-more-outline"
                style="float: right; padding: 3px 0"
                @click="handleGoUrl('/shouwen/daibanshouwen')"
              ></i>
            </el-tooltip>
          </div>
          <div>
            <el-table :data="daibanshouwen" stripe style="width: 100%">
              <el-table-column
                prop="biaoti"
                align="center"
                label="来文标题"
                show-overflow-tooltip
                min-width="150"
              >
<template slot-scope="scope">
  <div @click="handleEdit(2, scope.row)">
    {{scope.row.biaoti}}</div>
</template>
              </el-table-column>
              <el-table-column prop="laiwenren" align="center" label="来文人" width="100"></el-table-column>
              <el-table-column
                prop="laiwentime"
                align="center"
                label="来文时间"
                width="100"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="zhuangtai" align="center" label="状态" width="100" fixed="right"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as API from '@/api';
  export default {
    name: 'Main',
    mounted() {
      localStorage.setItem('qiangzhishuaxin', 1);
      this.gengxin();
    },
    data() {
      return {
        userdata: JSON.parse(localStorage.getItem('userdata')),
        cishu: 144,
        ifnew: 1,
        lunbotulist: [],
        dateList: {
          date: '',
          weekday: '',
          time: ''
        },
        base: API.base,
        duban: 0,
        huibao: 0,
        youjian: 0,
        tixing: 0,
        fawenduban: 0,
        shouwenduban: 0,
        gonggao: [],
        daibanfawen: [],
        daibanshouwen: []
      };
    },
    methods: {
      showcontent(content) {
        this.$router.push({
          path: '/showhtml',
          query: {
            content: content
          }
        });
      },
      gengxin() {
        API.getlunbotulist({}).then(({
          data
        }) => {
          this.lunbotulist = data.lunbotulist;
        });
        API.getshouyeweidu({
          token: localStorage.getItem('token')
        }).then(({
          data
        }) => {
          if (this.duban < data.duban && this.duban != 0) {
            this.$message.success({
              showClose: true,
              message: '我的督办已更新请查看',
              duration: 60000
            });
          }
          this.duban = data.duban;
          if (this.huibao < data.huibao && this.huibao != 0) {
            this.$message.success({
              showClose: true,
              message: '我的汇报已更新请查看',
              duration: 60000
            });
          }
          this.huibao = data.huibao;
          if (this.youjian < data.youjian && this.youjian != 0) {
            this.$message.success({
              showClose: true,
              message: '未读邮件已更新请查看',
              duration: 60000
            });
          }
          this.youjian = data.youjian;
          if (this.tixing < data.tixing && this.tixing != 0) {
            this.$message.success({
              showClose: true,
              message: '提醒待办已更新请查看',
              duration: 60000
            });
          }
          this.tixing = data.tixing;
          if (this.userdata.userid == 'wubo') {
            this.fawenduban = data.fawenduban;
            this.shouwenduban = data.shouwenduban;
          }
        });
        API.getgonggaoguanli({
          token: localStorage.getItem('token'),
          doctype: 'gonggao',
          query: ''
        }).then(({
          data
        }) => {
          this.gonggao = data.dataTable.slice(0, 5);
        });
        API.getdaibanfawen({
          token: localStorage.getItem('token'),
          doctype: 'fawen',
          query: ''
        }).then(({
          data
        }) => {
          if (this.fawenduban < data.dataTable.length && this.fawenduban != 0) {
            this.$message.success({
              showClose: true,
              message: '发文督办已更新请查看',
              duration: 60000
            });
          }
          this.fawenduban = data.dataTable.length;
          this.daibanfawen = data.dataTable.slice(0, 5);
        });
        API.getdaibanfawen({
          token: localStorage.getItem('token'),
          doctype: 'shouwen',
          query: ''
        }).then(({
          data
        }) => {
          if (this.shouwenduban < data.dataTable.length && this.shouwenduban != 0) {
            this.$message.success({
              showClose: true,
              message: '收文督办已更新请查看',
              duration: 60000
            });
          }
          this.shouwenduban = data.dataTable.length;
          this.daibanshouwen = data.dataTable.slice(0, 5);
        });
        this.cishu -= 1;
        if (this.cishu > 0) {
          setTimeout(this.gengxin, 600000);
        }
      },
      handleEdit(e, row) {
        if (e == 0) {
          this.$router.push({
            path: '/bangongguanli/gonggao',
            query: {
              wendangid: row.wendangid
            }
          });
        } else if (e == 1) {
          if (row.doctype == 'gongwen') {
            this.$router.push({
              path: '/fawen/gongwen',
              query: {
                wendangid: row.wendangid
              }
            });
          } else if (row.doctype == 'fawen') {
            this.$router.push({
              path: '/fawen/fawen',
              query: {
                wendangid: row.wendangid
              }
            });
          } else if (row.doctype == 'huiyi') {
            this.$router.push({
              path: '/fawen/huiyi',
              query: {
                wendangid: row.wendangid
              }
            });
          } else if (row.doctype == 'dangwu') {
            this.$router.push({
              path: '/fawen/dangwu',
              query: {
                wendangid: row.wendangid
              }
            });
          } else if (row.doctype == 'dangwuhuiyi') {
            this.$router.push({
              path: '/fawen/dangwuhuiyi',
              query: {
                wendangid: row.wendangid
              }
            });
          } else if (row.doctype == 'qianbao') {
            this.$router.push({
              path: '/fawen/qianbao',
              query: {
                wendangid: row.wendangid
              }
            });
          } else if (row.doctype == 'yian') {
            this.$router.push({
              path: '/fawen/yian',
              query: {
                wendangid: row.wendangid
              }
            });
          } else if (row.doctype == 'gouzhi') {
            this.$router.push({
              path: '/fawen/gouzhi',
              query: {
                wendangid: row.wendangid
              }
            });
          }
        } else if (e == 2) {
          this.$router.push({
            path: '/shouwen/shouwendengji',
            query: {
              wendangid: row.wendangid
            }
          });
        }
      },
      handleGoUrl(url) {
        this.$router.push({
          path: url
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .oa_main {
    background: #efefef;
  }
  .toubanimg {
    height: 340px;
  }
  .oa_main_card {
    height: 100px;
    .el-card {
      margin: 6px;
    }
    .todo_l {
      line-height: 70px;
      color: #fff;
      .tl {
        font-size: 18px;
        font-weight: 500;
        text-align: center;
      }
      .tr {
        .el-button--text {
          font-size: 60px;
          font-weight: 500;
          color: #fff;
          line-height: 70px;
        }
        .el-button--text:hover {
          font-size: 60px;
          transition: 0.5;
          text-shadow: 2px 2px 1px #666;
        }
      }
    }
  }
  .oa_doc {
    margin: 25px 0px;
    .box-card {
      height: 380px;
      background: #ffffff;
    }
    .el-card {
      margin: 0 6px;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #409eff;
      }
      .el-icon-more-outline:hover {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-search {
        font-weight: bold;
      }
    }
  }
</style>

<style lang="scss">
  .oa_main_card {
    .el-card__body {
      height: 75px;
    }
  }
  .el-card__body:hover {
    box-shadow: 3px 3px 3px #ccc;
  }
  .toubanimg {
    height: 400px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
