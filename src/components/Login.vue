<template>
  <div class="body_main">
    <vue-particles z-index=-1 color="#409eff" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true"
      hoverMode="grab" :clickEffect="true" clickMode="push" class="main_body">
    </vue-particles>
    <img class="touban" :src="toubanimg" />
    <div class="kuang">
      <div class="shouhang">
        <h3 class="anniutext">首页</h3>
        <h3 class="anniutext">集团公司概况</h3>
        <h3 class="anniutext">党建平台</h3>
        <h3 class="anniutext">公告通知</h3>
        <h3 class="anniutext">电子公文</h3>
        <h3 class="anniutext">政务公开</h3>
      </div>
      <div class="body">
        <el-carousel class="toubanimg" :interval="4000" arrow="always">
          <el-carousel-item v-for="item in toubanimageslist" :key="item">
            <img :src="item" width="100%" height="100%" />
          </el-carousel-item>
        </el-carousel>
        <div class="youbian">
          <el-form class="login-container" ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px">
            <h3 class="title">用户登录</h3>
            <el-form-item prop="username">
              <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>
            <div class="xianshi" v-if="xianshi">账号或密码错误</div>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
              <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="body">
        <div class="bodytext">
          广西铁路旅游传媒集团有限责任公司 成立于2004年04月22日，注册地址在南宁市衡阳西路３０号大院３号楼，主要从事承办旅游专列运营的组织服务，旅游信息咨询服务；火车票代售；代购火车票、汽车票、飞机票、船票及票务咨询；国内货物运输代理；销售：办公用品、家用电器、工艺美术品、金属材料（除国家专控产品外）；门面柜台的销售及租赁；房屋租赁，汽车租赁；保险代理服务（具体项目以审批部门批准为准）；以下项目限分支机构经营：销售：预包装食品；快餐食品、卤味肉制品、粽子、面点、米粉；卷烟、雪茄烟的零售；销售：日用百货、水果、农副土特产品（仅限初级农产品）、保健用品（除国家专控产品）、五金交电（除助力自行车）、矿产品（除国家专控产品）、装饰材料（除危险化学品）、纸张、文化用品、印刷器材；候车场所（茶座）；接待旅客住宿；行李包寄存、保管、打包服务；装卸服务；停车场服务；国内各类广告的设计、制作、代理及发布；出版物批发、零售；包装装潢印刷、其他印刷品印刷；旅行社业务，出境旅游业务；会展服务；住宿服务，餐饮服务；会务服务、健康管理信息咨询、摄影器材销售及摄影服务、体育用品销售、家禽养殖及蛋制品的销售、饲料销售、餐具(除一次性餐具外）销售。。欢迎交流合作！
        </div>
        <div class="youbian">
          <div class="lianjietitle">友情链接</div>
          <div class="lianjiecontent" >中国铁路南宁局集团有限公司</div>
          <div class="lianjiecontent" >集团公司运输部</div>
          <div class="lianjiecontent" >集团公司运输部规章系统</div>
          <div class="lianjiecontent" >集团公司科信部</div>
          <div class="lianjiecontent">集团公司贷运部</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from '../api';
  export default {
    data() {
      return {
        toubanimg: API.base + "/data/touban2.png",
        toubanimageslist: [API.base + '/data/1.jpg', API.base + '/data/2.jpg', API.base + '/data/3.jpg', API.base + '/data/4.jpg', API.base + '/data/5.jpg'],
        loading: false,
        xianshi: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            }
            //{ validator: validaePass }
          ],
          pwd: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      sleep(ms) {
        return new Promise(resolve =>
          setTimeout(resolve, ms)
        )
      },
      handleLogin() {
        let that = this;
        this.$refs.AccountFrom.validate(valid => {
          if (valid) {
            this.loading = true;
            let loginParams = {
              username: this.account.username,
              pwd: this.account.pwd
            };
            API.userLogin(loginParams)
              .then(({
                data
              }) => {
                localStorage.removeItem('token');
                if (data.MSG == 'YES') {
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('userdata', data.data);
                  that.$router.push({
                    path: '/'
                  });
                } else {
                  that.xianshi = true;
                  that.sleep(2000).then(() => {
                    that.xianshi = false;
                    that.loading = false;
                  });
                }
              }).catch(() => {
                that.loading = false;
                this.$message({
                  message: '网络错误!'
                });
              });
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .body_main {
    width: 100%;
    position: relative;
    .main_body {
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background: #ffffff;
    }
  }
  
  .touban {
    width: 80%;
    margin-left: 10%;
    height: 250px;
    position: relative;
  }
  
  .kuang {
    position: relative;
    padding-bottom: 20px;
    border-radius: 5px;
    margin-left: 10%;
    width: 80%;
    background: #c4261a;
  }
  
  .shouhang {
    height: 40px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
  }
  
  .anniutext {
    border-radius: 5px;
    text-align: center;
    width: 120px;
    height: 100%;
    line-height: 40px;
    background: #EE9A00;
    position: relative;
    color: #ffffff;
  }
  
  .body {
    padding-top: 20px;
    width: 100%;
    display: flex;
  }
  
  .bodytext {
    position: relative;
    color: #ffda4d;
    width: 68%;
    margin-left: 2%;
  }
  
  .toubanimg {
    width: 68%;
    margin-left: 2%;
  }
  
  .youbian {
    border-radius: 5px;
    border: 1px solid #eaeaea;
    background: #efefef;
    text-align: center;
    margin-left: 2%;
    width: 26%;
  }
  
  .lianjietitle {
    height: 30px;
    line-height: 30px;
    background: #409EFF;
    margin-left: 20px;
    margin-top: 20px;
    margin-right: 20px;
    font-size: 16px;
    font-weight: 450;
    color: #efefef;
  }
  
  .lianjiecontent {
    margin-top: 10px;
    color: #000000;
  }
  
  .login-container {
    height: 100%;
    padding: 0px 20px 0px 20px;
    .title {
      background: #409EFF;
      font-weight: 450;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      color: #ffffff;
    }
    .remember {
      margin: 0px 0px 20px 0px;
    }
    .xianshi {
      color: #c4261a;
      text-align: center;
    }
  }
  
  .el-carousel__item h3 {
    color: #409EFF;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
