<template>
  <el-row class="container">
    <el-row :span="24" class="topbar-wrap">
      <el-col :span="12" class="topbar-title">
        <img :src="logourl" class="logo" @click="jumpTo('/main')">
        <img :src="toubanurl" class="touban" @click="jumpTo('/main')">
      </el-col>
      <el-col :span="4" class="date_l">
        <el-row>
          <el-col :span="12" class="tl">
            <el-row :span="12" class="tlu">{{dateList.date}}</el-row>
            <el-row :span="12" class="tlb">{{dateList.weekday}}</el-row>
          </el-col>
          <el-col :span="12" class="tr">{{dateList.time}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="4" class="topbar-account">
        <el-dropdown trigger="click">
          <span class="userinfo-inner">
                <img v-if="touxiangUrl.length>0" :src="touxiangUrl" class="user_pic">
                <img v-else src="../assets/images/user.jpeg" class="user_pic">
                {{nickname}}
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/xitongguanli/profile')">
                <span style="color: #555;font-size: 14px;">我的信息</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/xitongguanli/touxiang')">
                <span style="color: #555;font-size: 14px;">我的头像</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/xitongguanli/qianming')">
                <span style="color: #555;font-size: 14px;">我的签名</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/xitongguanli/changepwd')">
                <span style="color: #555;font-size: 14px;">修改密码</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--导航菜单-->
        <el-menu uniqueOpened background-color="#cfcfcf" text-color="#000000" active-text-color="#0c23ff" router :default-active="defaultActiveIndex" :collapse="collapsed" @select="handleSelect" ref="nihao">
          <div v-for="(item,index) in $router.options.routes" :key="item.name">
            <el-submenu v-if="item.menuShow" :index="index+''">
              <div slot="title">
                <span slot="title">{{item.name}}</span>
              </div>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" :class="$route.path==term.path?'is-active':''">
                <div v-if="term.name!='人员管理'&&term.name!='文档管理'&&term.name!='页面管理'">
                  <span slot="title">{{term.name}}</span>
                </div>
                <div v-else-if="quanxian==28||quanxian==60">
                  <span slot="title">{{term.name}}</span>
                </div>
              </el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </aside>
      <!--右侧内容区-->
      <section class="content-container" ref="viewBox">
        <div class="grid-content bg-purple-light">
          <el-row>
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </el-row>
          <el-row :span="24" style="text-align:center;line-height:100px;color:#666;height:100px;">
            <el-col class="shenzhenyuzi">深圳宇子科技提供技术支持</el-col>
          </el-row>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  import * as API from '@/api';
  export default {
    name: 'home',
    mounted() {
      localStorage.setItem('ifnew', 1);
      var userdata = JSON.parse(localStorage.getItem('userdata'));
      this.quanxian = userdata.quanxian;
      this.xiando();
      this.box = this.$refs.viewBox;
      this.box.addEventListener('scroll', () => {
        localStorage.setItem('scrollTop', this.$refs.viewBox.scrollTop);
      }, false)
    },
    destroyed() {
      localStorage.setItem('ifnew', 0);
    },
    data() {
      return {
        quanxian: 0,
        touxiangUrl: '',
        logourl: API.base + '/data/logo.png',
        toubanurl: API.base + '/data/touban.png',
        defaultActiveIndex: '',
        nickname: JSON.parse(localStorage.getItem('userdata')).name,
        collapsed: false,
        dateList: {
          date: '',
          weekday: '',
          time: ''
        }
      };
    },
    methods: {
      xiando() {
        API.getifzaixian({
          token: localStorage.getItem('token')
        }).then(({
          data
        }) => {
          if (data.MSG == 'NO') {
            this.$message({
              showClose: true,
              message: '您已在其他地方登陆，请重新登陆',
              duration: 2000
            });
            this.$router.push({
              path: '/login'
            });
          }
        });
        API.settouxiangUrl({
          token: localStorage.getItem('token')
        }).then(({
          data
        }) => {
          if (data.touxiangUrl.length > 0) this.touxiangUrl = API.base + '/data/' + data.touxiangUrl;
        });
        this.showTime();
      },
      showTime() {
        var ifnew = localStorage.getItem('ifnew');
        if (ifnew == 0) return '';
        var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var day = time.getDay();
        var hour = time.getHours();
        var minutes = time.getMinutes();
        var second = time.getSeconds();
        month < 10 ? (month = '0' + month) : month;
        date < 10 ? (date = '0' + date) : date;
        hour < 10 ? (hour = '0' + hour) : hour;
        minutes < 10 ? (minutes = '0' + minutes) : minutes;
        this.dateList.date = year + '年' + month + '月' + date + '日';
        this.dateList.weekday = show_day[day];
        this.dateList.time = hour + ':' + minutes;
        let that = this;
        setTimeout(that.showTime, 10000);
      },
      handleSelect(index,indexPath) {
        this.defaultActiveIndex = index;
      },
      //折叠导航栏
      jumpTo(url) {
        if (this.$route.path == '/main' && url == '/main') {
          this.$router.go(0);
        }
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout() {
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
            confirmButtonClass: 'el-button--warning'
          })
          .then(() => {
            //确认
            localStorage.removeItem('token');
            that.loading = true;
            that.$router.push('/login'); //用go刷新
          })
          .catch(() => {});
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    background: #efefef;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .topbar-wrap {
      position: fixed;
      height: 100px;
      line-height: 100px;
      background: #bbe3f6;
      padding: 0px;
      .topbar-title {
        background: #000000;
        width: 1400px;
      }
      .logo {
        background: #ffffff;
        position: fixed;
        height: 100px;
        width: 200px;
        top: 0px;
        left: 0px;
      }
      .touban {
        position: fixed;
        height: 100px;
        width: 58%;
        top: 0px;
        left: 200px;
      }
      .date_l {
        margin-left: 73%;
        color: #000000;
        height: 100px;
        width: 16%;
        .tl {
          height: 100px;
          font-size: 14px;
          font-weight: bold;
          .tlu {
            height: 50px;
            line-height: 70px;
          }
          .tlb {
            height: 50px;
            line-height: 30px;
          }
        }
        .tr {
          line-height: 100px;
          font-size: 42px;
          text-align: center;
        }
      }
      .topbar-account {
        margin-top: 10px;
        margin-left: 92%;
        width: 120px;
        position: fixed;
      }
      .userinfo-inner {
        color: #000;
        .user_pic {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        .iconfont {
          font-weight: 800;
        }
        .iconfont:hover {
          color: #007cf8;
        }
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: fixed;
      background: #efefef;
      top: 100px;
      bottom: 0px;
      overflow: hidden;
    }
    aside {
      min-width: 60px;
      background: #efefef;
      &::-webkit-scrollbar {
        display: none;
      }
      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }
      .el-menu {
        height: 100%;
        /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: rgb(255, 255, 255);
        border-right: 0px;
      }
      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 200px;
      }
      .el-menu--collapse {
        width: 60px;
      }
      .el-menu .el-menu-item,
      .el-submenu .el-submenu__title {
        height: 56px;
        line-height: 56px;
      }
      .el-submenu .el-submenu__title .el-menu-item:hover,
      .el-submenu .el-menu-item:hover,
      .el-submenu .el-submenu__title:hover {
        background-color: #efefef;
        color: #ffda4d;
      }
    }
    .menu-toggle {
      float: left;
      text-align: center;
      color: #efefef;
      opacity: 0.8;
      font-weight: bold;
      line-height: 60px;
      width: 60px;
    }
    .menu-toggle:hover {
      color: #409eff;
    }
    .menu-toggle:hover {
      cursor: pointer;
      opacity: 0.8;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 10px;
      .content-wrapper {
        box-sizing: border-box;
      }
    }
    .shenzhenyuzi {
      margin-top: 50px;
    }
  }
</style>
