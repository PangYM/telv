<template>
  <el-row class="container">
    <!--头部-->
  
    <el-col :span="24" class="topbar-wrap">
      <!--展开折叠开关-->
      <!-- <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-category" v-show="!collapsed"></i>
          <i class="iconfont icon-more" v-show="collapsed"></i>
        </div> -->
      <div class="topbar-title">
        <img :src="logourl" class="logo" />
        <img :src="toubanurl" class="touban" />
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><img src="../assets/images/user.jpeg" class="user_pic"> 吴波&nbsp;&nbsp;<i
                        class="iconfont icon-code"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--导航菜单-->
        <el-menu unique-opened="true" background-color="#cfcfcf" text-color="#000000" active-text-color="#0c23ff" :default-active="defaultActiveIndex" router :collapse="collapsed" @select="handleSelect">
          <div v-for="(item,index) in $router.options.routes" :key="item">
            <el-submenu v-if="item.menuShow && !item.leaf" :index="index+''">
              <div slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </div>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i>
                <span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
  
          </div>
        </el-menu>
      </aside>
      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-row>
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </el-row>
          <el-row :span="24" style="text-align:center;line-height:100px;color:#666;height:100px;">
            <el-col>深圳宇子科技提供技术支持</el-col>
          </el-row>
        </div>
      </section>
    </el-col>
  
  </el-row>
</template>

<script>
  import * as API from '@/api'
  export default {
    name: 'home',
    created() {
      this.$on('setNickName', text => {
        this.nickname = text;
      });
  
      this.$on('goto', url => {
        if (url === '/login') {
          localStorage.removeItem('access-user');
        }
        this.$router.push(url);
      });
    },
    data() {
      return {
        logourl: API.base + '/data/logo.jpg',
        toubanurl: API.base + '/data/touban.jpg',
        defaultActiveIndex: '0',
        nickname: '',
        collapsed: false
      };
    },
    methods: {
      handleSelect(index) {
        this.defaultActiveIndex = index;
      },
      //折叠导航栏
      collapse: function() {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url) {
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
            that.loading = true;
            that.$router.push('/login'); //用go刷新
          })
          .catch(() => {});
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .topbar-wrap {
      height: 100px;
      line-height: 100px;
      background: #0c23ff;
      padding: 0px;
      .topbar-btn {
        color: rgb(223, 208, 208);
      }
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .logo {
        position: absolute;
        height: 100px;
        width: 220px;
        top: 0px;
        left: 0px;
      }
      .touban {
        position: absolute;
        height: 100px;
        width: 1100px;
        top: 0px;
        left: 220px;
      }
      .top_logo {
        font-size: 18px;
        color: #ffffff;
        font-weight: 500;
        opacity: 0.8;
      }
      .topbar-title {
        float: left;
        width: 350px;
        padding-left: 220px;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #ffffff;
        opacity: 0.8;
        padding-left: 10px;
        position: relative;
        .user_pic {
          position: absolute;
          left: -30px;
          top: -8px;
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
      position: absolute;
      background: #ffffff;
      top: 100px;
      bottom: 0px;
      overflow: hidden;
    }
    aside {
      min-width: 60px;
      background: #fff;
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
        width: 220px;
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
        background-color: #ffffff;
        color: #ffda4d;
      }
    }
    .menu-toggle {
      float: left;
      text-align: center;
      color: #ffffff;
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
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;
      .content-wrapper {
        box-sizing: border-box;
      }
    }
  }
</style>
