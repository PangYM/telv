<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人事务</el-breadcrumb-item>
          <el-breadcrumb-item>发送邮件</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-row class="send_file">
      <div class="fasong">
        <el-button type="primary" v-if="xiugai" @click="querenfasong(0)">保存</el-button>
        <el-button type="primary" v-if="xiugai" @click="querensend">发送</el-button>
        <el-button type="primary" @click="guanbi(0)">关闭</el-button>
        <div class="renyuan" v-if="istongxinlu">
          <tree-transfer
            class="tongxinlu"
            :title="title"
            :from_data="fromData"
            :to_data="toData"
            :defaultProps="{label:'label'}"
            @addBtn="add"
            @removeBtn="remove"
            :mode="mode"
            width="50%"
            height="500px"
            filter
          ></tree-transfer>
          <el-button type="primary" @click="querenfasong(1)">确定发送</el-button>
          <el-button type="primary" @click="guanbi(1)">关闭</el-button>
        </div>
      </div>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="邮件标题">
            <el-input v-if="xiugai" v-model="form.biaoti" placeholder="请输入邮件标题"></el-input>
            <div v-else class="xianshi">{{form.biaoti}}</div>
          </el-form-item>
          <el-row></el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发件人">
                <div class="xianshi">{{form.nigaoren}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.starttime.length" label="收件日期">
                <el-input v-if="xiugai" v-model="form.starttime" placeholder></el-input>
                <div v-else class="xianshi">{{form.starttime}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="正文" class="editer">
            <vue-editor
              v-if="xiugai"
              useCustomImageHandler
              @imageAdded="handleImageAdded"
              v-model="form.content"
            ></vue-editor>
            <vue-editor
              v-else
              disabled
              useCustomImageHandler
              @imageAdded="handleImageAdded"
              v-model="form.content"
            ></vue-editor>
          </el-form-item>
          <el-form-item>
            <li v-bind="form.fileList" v-for="item in form.fileList" :key="item.name">
              <a
                target="_blank"
                :href="baseurl+'/data/fujian/'+form.wendangid+'/'+item.name"
              >{{item.name}}</a>
            </li>
          </el-form-item>
          <el-form-item v-if="xiugai" label="附件">
            <el-upload
              drag
              ref="upload"
              :action="baocunfujian"
              :data="upload"
              :on-change="handlechange"
              :on-remove="handleremove"
              :file-list="form.fujianList"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将附件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
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
    if (this.$route.query.wendangid) {
      API.getmindocid({
        token: localStorage.getItem("token"),
        wendangid: this.$route.query.wendangid
      }).then(({ data }) => {
        this.form = data.data;
        this.xiugai = 0;
        this.form.fujianList = [];
        for (var i = 0; i < this.form.fileList.length; ++i) {
          this.form.fujianList.push({
            name: this.form.fileList[i].name,
            url:
              this.baseurl +
              "/data/fujian/" +
              this.form.wendangid +
              "/" +
              this.form.fileList[i].name
          });
        }
      });
      API.mindocyiyue({
        token: localStorage.getItem("token"),
        wendangid: this.$route.query.wendangid
      }).then(({ data }) => {});
    } else {
      API.getfawenhao().then(({ data }) => {
        this.form.wendangid = data.wendangid + data.suiji;
        this.upload.wendangid = this.form.wendangid;
        this.form.nigaouserid = userdata.userid;
        this.form.nigaoren = userdata.name;
        this.form.nigaodanwei = userdata.group;
      });
    }
  },
  data() {
    return {
      xiugai: 1,
      istongxinlu: 0,
      title: ["未选列表", "已选列表"],
      mode: "transfer",
      istongxinlu: 0,
      fromData: [],
      toData: [],
      baseurl: API.base,
      baocunfujian: API.baseurl + "baocunfujian",
      upload: {},
      form: {
        doctype: "youjian",
        zhuangtai: "caogao",
        wendangid: "",
        biaoti: "",
        nigaouserid: "",
        nigaoren: "",
        nigaodanwei: "",
        starttime: "",
        content: "",
        shenpihis: {},
        fileList: [],
        fujianList: []
      }
    };
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      API.baocunimage(file).then(result => {
        let url = result.data.url;
        url = API.base + "/data/" + url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    },
    querenfasong(e) {
      if (e && this.toData.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择发送人",
          duration: 2000
        });
        return "";
      }
      var fasongdata = {
        toData: this.toData,
        wendang: this.form,
        token: localStorage.getItem("token")
      };
      if (!e) fasongdata.toData = [];
      API.fasongmindoc(fasongdata).then(({ data }) => {
        this.$message.success({
          showClose: true,
          message: "发送成功",
          duration: 2000
        });
        if (e)
          this.$router.push({
            path: "/main"
          });
      });
    },
    querensend() {
      this.istongxinlu = 1;
      API.gettongxinlu({ token: localStorage.getItem("token") }).then(
        ({ data }) => {
          this.fromData = data.tongxinlu;
        }
      );
    },
    guanbi(e) {
      if (e == 0) {
        this.$router.push({
          path: "/main"
        });
      } else {
        this.istongxinlu = 0;
      }
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
}
.renyuan {
  text-align: center;
  .tongxinlu {
    margin-left: 25%;
  }
}
.xianshi {
  background: #ffffff;
}
</style>
