<template>
  <div class="body_main">
    <vue-particles
      z-index="-1"
      color="#409eff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="main_body"
    ></vue-particles>
    <img class="touban" :src="toubanimg">
    <div class="kuang">
      <div class="shouhang">
        <div v-for="(item, index) in dengluyelist" :key="item">
          <el-button class="anniutext" @click="xuanzeanniu(index)">{{item.title}}</el-button>
        </div>
      </div>
      <div class="body">
        <el-carousel class="toubanimg" :interval="4000" arrow="always">
          <el-carousel-item class="toubanimg1" v-for="item in lunbotulist" :key="item">
            <img :src="base+item.url" width="100%" height="100%">
          </el-carousel-item>
        </el-carousel>
        <div class="youbian">
          <el-form
            class="login-container"
            ref="AccountFrom"
            :model="account"
            :rules="rules"
            label-position="left"
            label-width="0px"
          >
            <h3 class="title">用户登录</h3>
            <el-form-item prop="zhanghao">
              <el-input type="text" v-model="account.zhanghao" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input
                type="password"
                v-model="account.pwd"
                auto-complete="off"
                placeholder="密码"
                @keyup.enter.native="handleLogin"
              ></el-input>
            </el-form-item>
            <div class="xianshi" v-if="xianshi">账号或密码错误</div>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
              <el-button
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleLogin"
                :loading="loading"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="body">
        <div class="bodytext">
          <div stype="width:100%;" v-html="content"></div>
        </div>
        <div class="youbian">
          <div class="lianjietitle">友情链接</div>
          <div v-for="item in youqinglist" :key="item">
            <div class="lianjiecontent">
              <a target="_blank" :href="item.url">{{item.title}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "../api";
export default {
  mounted() {
    API.getdengluyelist().then(({ data }) => {
      this.dengluyelist = data.dengluyelist;
      this.content = this.dengluyelist[0].content;
    });
    API.getlunbotulist({}).then(({ data }) => {
      this.lunbotulist = data.lunbotulist;
    });
    API.getyouqinglist().then(({ data }) => {
      this.youqinglist = data.youqinglist;
    });
  },
  data() {
    return {
      base: API.base,
      toubanimg: API.base + "/data/login.jpg",
      lunbotulist: [],
      dengluyelist: [],
      youqinglist: [],
      loading: false,
      xianshi: false,
      content: "",
      account: {
        zhanghao: "",
        pwd: ""
      },
      rules: {
        zhanghao: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
          //{ validator: validaePass }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    xuanzeanniu(e) {
      this.content = this.dengluyelist[e].content;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    handleLogin() {
      let that = this;
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.loading = true;
          let loginParams = {
            zhanghao: this.account.zhanghao,
            pwd: this.account.pwd
          };
          API.userLogin(loginParams)
            .then(({ data }) => {
              localStorage.removeItem("token");
              if (data.MSG == "YES") {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userdata", JSON.stringify(data.userdata));
                that.$router.push({
                  path: "/"
                });
              } else {
                that.xianshi = true;
                that.sleep(2000).then(() => {
                  that.xianshi = false;
                  that.loading = false;
                });
              }
            })
            .catch(() => {
              that.loading = false;
              this.$message({
                message: "网络错误!"
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
  background: #0066ff;
}

.shouhang {
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}

.anniutext {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 550;
  border-radius: 5px;
  text-align: center;
  width: 150px;
  height: 50px;
  line-height: 25px;
  background: #ffffff;
  position: relative;
  color: #1c0fc7;
}

.body {
  padding-top: 20px;
  width: 100%;
  display: flex;
}

.bodytext {
  width: 63%;
  margin-left: 2%;
  margin-right: 2%;
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 50px;
  padding-bottom: 50px;
  background: #ffffff;
  position: relative;
  color: #000000;
}

.toubanimg {
  height: 400px;
  width: 66%;
  margin-left: 2%;
  margin-right: 2%;
}
.toubanimg1 {
  height: 400px;
  border-radius: 5px;
}

.youbian {
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background: #ffffff;
  text-align: center;
  margin-left: 2%;
  margin-right: 2%;
  width: 26%;
}

.lianjietitle {
  height: 30px;
  line-height: 30px;
  background: #0066ff;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 20px;
  font-size: 16px;
  color: #ffffff;
}

.lianjiecontent {
  margin-top: 10px;
  color: #000000;
}

.login-container {
  height: 100%;
  padding: 0px 20px 0px 20px;
  .title {
    background: #0066ff;
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
  color: #1166ff;
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
