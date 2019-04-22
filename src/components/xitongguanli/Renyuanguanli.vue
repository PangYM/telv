<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-row v-if="quanxian==60||quanxian==28" class="send_file">
      <div class="fasong">
        <div>
          <el-button class="anniu" type="primary" @click="xiugaixiugai">修改人员</el-button>
          <el-button class="anniu" type="primary" @click="xinzengxinzeng">新增人员</el-button>
          <el-button class="anniu" type="primary" @click="shanchushanchu">删除人员</el-button>
          <el-button class="anniu" type="primary" @click="xinjianxinjian">新建部门</el-button>
          <el-button class="anniu" type="primary" @click="piliangpiliang">批量导入</el-button>
          <el-button v-if="xiugai+shanchu+xinzeng+xinjian+piliang" type="primary" @click="guanbi">关闭</el-button>
        </div>

        <!-- 修改人员 -->
        <el-form v-if="xiugai" class="renyuan" ref="form" :model="xiugaiform" label-width="80px">
          <el-input v-model="userid" placeholder="请输入用户账号"></el-input>
          <el-button class="anniu" type="primary" @click="chaxun">查询</el-button>
          <el-form-item prop="id" label="账号">
            <el-input v-model="xiugaiform.id" disabled></el-input>
          </el-form-item>
          <el-form-item prop="pwd" label="密码">
            <el-input v-model="xiugaiform.pwd"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名">
            <el-input v-model="xiugaiform.name"></el-input>
          </el-form-item>
          <el-form-item prop="group" label="所在部门">
            <el-input v-model="xiugaiform.group"></el-input>
          </el-form-item>
          <el-form-item prop="quanxian" label="权限">
            <el-select v-model="xiugaiform.quanxian" placeholder="普通员工" style="width:100%;">
              <el-option label="普通员工" value="50"></el-option>
              <el-option label="部门副职" value="40"></el-option>
              <el-option label="部门正职" value="30"></el-option>
              <el-option label="分管领导" value="20"></el-option>
              <el-option label="大领导" value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="isbumenzhang" label="职位级别">
            <el-select v-model="xiugaiform.isbumenzhang" placeholder="普通员工" style="width:100%;">
              <el-option label="普通员工" value="0"></el-option>
              <el-option label="部门正职" value="1"></el-option>
              <el-option label="部门副职" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="zhiweiname" label="职位名称">
            <el-input v-model="xiugaiform.zhiweiname"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机">
            <el-input v-model="xiugaiform.phone"></el-input>
          </el-form-item>
          <el-form-item prop="dianhua" label="办公电话">
            <el-input v-model="xiugaiform.dianhua"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="xiugaiform.email"></el-input>
          </el-form-item>
        </el-form>

        <!-- 新增人员 -->
        <el-form v-if="xinzeng" class="renyuan" ref="form" :model="xinzengform" label-width="80px">
          <el-form-item prop="id" label="账号">
            <el-input v-model="xinzengform.id"></el-input>
          </el-form-item>
          <el-form-item prop="pwd" label="密码">
            <el-input v-model="xinzengform.pwd"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名">
            <el-input v-model="xinzengform.name"></el-input>
          </el-form-item>
          <el-form-item prop="group" label="所在部门">
            <el-input v-model="xinzengform.group"></el-input>
          </el-form-item>
          <el-form-item prop="quanxian" label="权限">
            <el-select v-model="xinzengform.quanxian" placeholder="普通员工" style="width:100%;">
              <el-option label="普通员工" value="50"></el-option>
              <el-option label="部门副职" value="40"></el-option>
              <el-option label="部门正职" value="30"></el-option>
              <el-option label="分管领导" value="20"></el-option>
              <el-option label="大领导" value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="isbumenzhang" label="职位级别">
            <el-select v-model="xinzengform.isbumenzhang" placeholder="普通员工" style="width:100%;">
              <el-option label="普通员工" value="0"></el-option>
              <el-option label="部门正职" value="1"></el-option>
              <el-option label="部门副职" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="zhiweiname" label="职位名称">
            <el-input v-model="xinzengform.zhiweiname"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机">
            <el-input v-model="xinzengform.phone"></el-input>
          </el-form-item>
          <el-form-item prop="dianhua" label="办公电话">
            <el-input v-model="xinzengform.dianhua"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="xinzengform.email"></el-input>
          </el-form-item>
        </el-form>

        <!-- 删除人员 -->
        <tree-transfer
          v-if="shanchu"
          class="eltree"
          :title="shanchutitle"
          :from_data="shanchufrom"
          :to_data="shanchuto"
          :defaultProps="{label:'label'}"
          @addBtn="shanchuadd"
          @removeBtn="shanchuremove"
          :mode="mode"
          width="50%"
          height="500px"
          filter
        ></tree-transfer>

        <!-- 新建部门 -->
        <div v-if="xinjian">
          <el-input class="bumenmingcheng" v-model="bumenmingcheng" placeholder="请输入新部门名字"></el-input>
          <div>
            <tree-transfer
              class="eltree"
              :title="xinjiantitle"
              :from_data="xinjianfrom"
              :to_data="xinjianto"
              :defaultProps="{label:'label'}"
              @addBtn="xinjianadd"
              @removeBtn="xinjianremove"
              :mode="mode"
              width="50%"
              height="500px"
              filter
            ></tree-transfer>
          </div>
        </div>

        <!-- 批量导入 -->
        <el-upload
          v-if="piliang"
          class="upload"
          ref="upload"
          drag
          :auto-upload="false"
          :on-success="onsuccess"
          :action="piliangdaoru"
          :data="upload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将附件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>

        <div>
          <el-button v-if="xiugai" type="primary" @click="querenxiugai">确认修改</el-button>
          <el-button v-if="shanchu" type="primary" @click="querenshanchu">确认删除</el-button>
          <el-button v-if="xinzeng" type="primary" @click="querenxinzeng">确认新增</el-button>
          <el-button v-if="xinjian" type="primary" @click="querenxinjian">确认新建</el-button>
          <el-button v-if="piliang" type="primary" @click="querenpiliang">确认导入</el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import * as API from "@/api";
import treeTransfer from "el-tree-transfer";
import { VueEditor } from "vue2-editor";
import axios from "axios";
export default {
  components: {
    VueEditor,
    treeTransfer
  },
  mounted() {
    var userdata = JSON.parse(localStorage.getItem("userdata"));
    this.quanxian = userdata.quanxian;
    API.gettongxinlu({
      token: localStorage.getItem("token"),
      isguanliyuan: 1
    }).then(({ data }) => {
      this.xinjianfrom = data.tongxinlu;
      this.xinjianto = [];
    });
  },
  data() {
    return {
      quanxian: 0,
      xiugai: 0,
      xinzeng: 0,
      shanchu: 0,
      xinjian: 0,
      piliang: 0,
      userid: "",
      upload: { token: localStorage.getItem("token") },
      mode: "transfer",
      xinjiantitle: ["现有人员", "新部门人员"],
      shanchutitle: ["现有人员", "将删除人员"],
      bumenmingcheng: "",
      shanchufrom: [],
      shanchuto: [],
      xinjianfrom: [],
      xinjianto: [],
      piliangdaoru: API.baseurl + "piliangdaoru",
      xiugaiform: {
        id: "",
        isbumenzhang: 0,
        name: "",
        pwd: "123456",
        phone: "",
        email: "",
        dianhua: "",
        zhiweiname: "",
        group: "",
        quanxian: 50
      },
      xinzengform: {
        id: "",
        isbumenzhang: 0,
        name: "",
        pwd: "123456",
        phone: "",
        email: "",
        dianhua: "",
        zhiweiname: "",
        group: "",
        quanxian: 50
      }
    };
  },
  methods: {
    querenpiliang() {
      this.$refs.upload.submit();
    },
    onsuccess(response, file, fileList) {
      if (response.MSG == "NO") {
        this.$message({
          type: "info",
          message: "导入文件文件格式不正确！"
        });
      } else {
        this.$message.success({
          showClose: true,
          message: "导入成功！",
          duration: 2000
        });
      }
    },
    chaxun() {
      if (this.userid.length == 0) {
        this.$message({
          showClose: true,
          message: "用户账户不能为空",
          duration: 2000
        });
        return "";
      }
      API.getUser({
        token: localStorage.getItem("token"),
        userid: this.userid
      }).then(({ data }) => {
        if (data.MSG == "NO") {
          this.$message({
            showClose: true,
            message: "当前账户不存在",
            duration: 2000
          });
          return "";
        }
        this.xiugaiform = data.userinfo;
      });
    },
    guanbi() {
      this.xiugai = 0;
      this.xinzeng = 0;
      this.shanchu = 0;
      this.xinjian = 0;
      this.piliang = 0;
    },
    xiugaixiugai() {
      this.xiugai = 1;
      this.xinzeng = 0;
      this.shanchu = 0;
      this.xinjian = 0;
      this.piliang = 0;
    },
    shanchushanchu() {
      this.xiugai = 0;
      this.xinzeng = 0;
      this.shanchu = 1;
      this.xinjian = 0;
      this.piliang = 0;
    },
    xinzengxinzeng() {
      this.xiugai = 0;
      this.xinzeng = 1;
      this.shanchu = 0;
      this.xinjian = 0;
      this.piliang = 0;
    },
    xinjianxinjian() {
      this.xiugai = 0;
      this.xinzeng = 0;
      this.shanchu = 0;
      this.xinjian = 1;
      this.piliang = 0;
    },
    piliangpiliang() {
      this.xiugai = 0;
      this.xinzeng = 0;
      this.shanchu = 0;
      this.xinjian = 0;
      this.piliang = 1;
    },
    querenxiugai() {
      if (
        this.xiugaiform.id.length == 0 ||
        this.xiugaiform.pwd.length == 0 ||
        this.xiugaiform.name.length == 0 ||
        this.xiugaiform.group.length == 0
      ) {
        this.$message({
          showClose: true,
          message: "账号/密码/姓名/所在部门不能为空",
          duration: 2000
        });
        return "";
      }
      console.log(this.xiugaiform);
      API.setUserProfile(this.xiugaiform).then(({ data }) => {
        this.$message.success({
          showClose: true,
          message: "修改成功！",
          duration: 2000
        });
        return "";
      });
    },
    querenxinzeng() {
      if (
        this.xinzengform.id.length == 0 ||
        this.xinzengform.pwd.length == 0 ||
        this.xinzengform.name.length == 0 ||
        this.xinzengform.group.length == 0
      ) {
        this.$message({
          showClose: true,
          message: "账号/密码/姓名/所在部门不能为空",
          duration: 2000
        });
        return "";
      }
      API.xinzengrenyuan({
        token: localStorage.getItem("token"),
        newuser: this.xinzengform
      }).then(({ data }) => {
        if (data.MSG == "YES") {
          this.$message.success({
            showClose: true,
            message: "新增成功",
            duration: 2000
          });
        }
      });
    },
    querenshanchu() {
      if (this.shanchuto.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择删除人员",
          duration: 2000
        });
        return "";
      }
      this.$confirm("确认删除？请谨慎操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.shanchurenyuan({
          token: localStorage.getItem("token"),
          shanchuto: this.shanchuto
        }).then(({ data }) => {
          if (data.MSG == "YES") {
            this.guanbi();
            this.$message.success({
              showClose: true,
              message: "修改成功",
              duration: 2000
            });
          }
        });
      });
    },
    querenxinjian() {
      if (this.bumenmingcheng.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入新建部门名称",
          duration: 2000
        });
        return "";
      }
      if (this.xinjianto.length == 0) {
        this.$message({
          showClose: true,
          message: "请添加人员到新部门",
          duration: 2000
        });
        return "";
      }
      var fasongdata = {
        xinjianto: this.xinjianto,
        bumenmingcheng: this.bumenmingcheng,
        token: localStorage.getItem("token")
      };
      API.xinjianbumen(fasongdata).then(({ data }) => {
        if (data.MSG == "YES") {
          this.guanbi();
          this.$message.success({
            showClose: true,
            message: "新建成功",
            duration: 2000
          });
        }
      });
    },
    shanchuadd(fromData, toData, obj) {
      this.shanchufrom = fromData;
      this.shanchuto = toData;
    },
    shanchuremove(fromData, toData, obj) {
      this.shanchufrom = fromData;
      this.shanchuto = toData;
    },
    xinjianadd(fromData, toData, obj) {
      this.xinjianfrom = fromData;
      this.xinjianto = toData;
    },
    xinjianremove(fromData, toData, obj) {
      this.xinjianfrom = fromData;
      this.xinjianto = toData;
    }
  }
};
</script>
<style lang="scss" scoped>
.send_file {
  margin: 25px 0;
  .set_tp {
    margin-left: 80px;
    height: 400px;
  }
}
.fasong {
  text-align: center;
  margin-bottom: 30px;
  .anniu {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .eltree {
    margin-left: 25%;
    width: 50%;
    height: 200px;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.renyuan {
  margin-left: 35%;
  width: 30%;
}
.bumenmingcheng {
  width: 50%;
  margin-bottom: 20px;
}
.upload {
  width: 30%;
}
</style>
