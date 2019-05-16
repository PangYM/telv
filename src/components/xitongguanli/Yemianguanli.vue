<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>页面管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-row v-if="quanxian==60||quanxian==28" class="send_file">
      <div class="fasong">
        <div>
          <el-button class="anniu" type="primary" @click="dengluyedengluye">登录页介绍</el-button>
          <el-button class="anniu" type="primary" @click="lunbotulunbotu">首页轮播图</el-button>
          <el-button class="anniu" type="primary" @click="youqingyouqing">友情链接</el-button>
          <el-button v-if="lunbotu+dengluye+youqing" type="primary" @click="guanbi">关闭</el-button>
        </div>

        <!-- 登录页 -->
        <el-table class="dengluye" v-if="dengluye" :data="dengluyelist" border stripe>
          <el-table-column prop="title" align="center" label="登录页按钮名称" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" placeholder="请输入登录页按钮名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="margin-bottom:20px;"
                v-if="scope.row.show==0"
                @click="xianshireirong(scope.$index, scope.row,1)"
              >显示内容</el-button>
              <el-button
                size="mini"
                style="margin-bottom:20px;"
                v-else
                @click="xianshireirong(scope.$index, scope.row,0)"
              >隐藏内容</el-button>
              <vue-editor
                v-if="scope.row.show==1"
                style="height:1000px;"
                useCustomImageHandler
                @imageAdded="handleImageAdded"
                v-model="scope.row.content"
              ></vue-editor>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="60">
            <template slot-scope="scope">
              <el-button
                size="small"
                icon="el-icon-plus"
                @click="handleAddTask0()"
                v-if="scope.$index == dengluyelist.length - 1&&dengluyelist.length < 5"
                :disabled="dengluyelist.length == 10 || !(scope.row.title && scope.row.content)"
              ></el-button>
              <el-button
                size="small"
                icon="el-icon-minus"
                @click="handleRemoveTask0(scope.$index)"
                v-else
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 轮播图 -->
        <el-table class="dengluye" v-if="lunbotu" :data="lunbotulist" border stripe>
          <el-table-column prop="url" align="center" label="图片名称" width="150">
            <template slot-scope="scope">
              <a v-if="scope.row.url.length" :href="base+scope.row.url">{{base+scope.row.url}}</a>
              <div>
                <el-upload
                  class="upload-demo"
                  :action="lunbotuUrl"
                  :data="uploadlist[scope.$index]"
                  :on-success="onsuccess"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="margin-bottom:20px;"
                v-if="scope.row.show==0"
                @click="xianshireirong1(scope.$index, scope.row,1)"
              >显示内容</el-button>
              <el-button
                size="mini"
                style="margin-bottom:20px;"
                v-else
                @click="xianshireirong1(scope.$index, scope.row,0)"
              >隐藏内容</el-button>
              <vue-editor
                v-if="scope.row.show==1"
                style="height:1000px;"
                useCustomImageHandler
                @imageAdded="handleImageAdded"
                v-model="scope.row.content"
              ></vue-editor>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="60">
            <template slot-scope="scope">
              <el-button
                size="small"
                icon="el-icon-plus"
                @click="handleAddTask1()"
                v-if="scope.$index == lunbotulist.length - 1&&lunbotulist.length < 5"
                :disabled="lunbotulist.length == 10 || !(scope.row.url && scope.row.content)"
              ></el-button>
              <el-button
                size="small"
                icon="el-icon-minus"
                @click="handleRemoveTask1(scope.$index)"
                v-else
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 友情链接 -->
        <el-table class="youqing" v-if="youqing" :data="youqinglist" border stripe>
          <el-table-column prop="title" align="center" label="网页名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" placeholder="请输入网址名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="网址" align="center" width="300">
            <template slot-scope="scope">
              <el-input v-model="scope.row.url" placeholder="请输入网址"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="60">
            <template slot-scope="scope">
              <el-button
                size="small"
                icon="el-icon-plus"
                @click="handleAddTask2"
                v-if="scope.$index == youqinglist.length - 1"
                :disabled="youqinglist.length == 10 || !(scope.row.title && scope.row.url)"
              ></el-button>
              <el-button
                size="small"
                icon="el-icon-minus"
                @click="handleRemoveTask2(scope.$index)"
                v-else
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top:30px">
          <el-button v-if="dengluye" type="primary" @click="querendengluye">确认修改</el-button>
          <el-button v-if="lunbotu" type="primary" @click="querenlunbotu">确认修改</el-button>
          <el-button v-if="youqing" type="primary" @click="querenyouqing">确认修改</el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import * as API from "@/api";
import { VueEditor } from "vue2-editor";
import axios from "axios";
export default {
  components: {
    VueEditor
  },
  mounted() {
    var userdata = JSON.parse(localStorage.getItem("userdata"));
    this.quanxian = userdata.quanxian;
  },
  data() {
    return {
      quanxian: 0,
      lunbotu: 0,
      youqing: 0,
      dengluye: 0,
      userid: "",
      base: API.base,
      lunbotuUrl: API.baseurl + "lunbotuUrl",
      uploadlist: [
        { token: localStorage.getItem("token"), xuhao: 0 },
        { token: localStorage.getItem("token"), xuhao: 1 },
        { token: localStorage.getItem("token"), xuhao: 2 },
        { token: localStorage.getItem("token"), xuhao: 3 },
        { token: localStorage.getItem("token"), xuhao: 4 }
      ],
      dengluyelist: [
        {
          title: "",
          content: " ",
          show: 0
        }
      ],
      lunbotulist: [
        {
          url: "",
          content: " ",
          show: 0
        }
      ],
      youqinglist: [
        {
          title: "",
          url: ""
        }
      ]
    };
  },
  methods: {
    onsuccess(response, file, fileList) {
      this.lunbotulist[response.xuhao].url = "/data/" + response.lunbotuUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    xianshireirong(index, row, e) {
      if (e == 1) {
        for (var i = 0; i < this.dengluyelist.length; ++i)
          this.dengluyelist[i].show = 0;
        this.dengluyelist[index].show = 1;
      } else {
        for (var i = 0; i < this.dengluyelist.length; ++i)
          this.dengluyelist[i].show = 0;
      }
    },
    xianshireirong1(index, row, e) {
      if (e == 1) {
        for (var i = 0; i < this.lunbotulist.length; ++i)
          this.lunbotulist[i].show = 0;
        this.lunbotulist[index].show = 1;
      } else {
        for (var i = 0; i < this.lunbotulist.length; ++i)
          this.lunbotulist[i].show = 0;
      }
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      API.baocunimage(file).then(result => {
        let url = result.data.url;
        url = API.base + "/data/" + url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    },
    querenlunbotu() {
      API.setlunbotulist({
        token: localStorage.getItem("token"),
        lunbotulist: this.lunbotulist
      }).then(({ data }) => {
        if (data.MSG == "YES") {
          this.$message.success({
            showClose: true,
            message: "设置轮播图成功！",
            duration: 2000
          });
        }
      });
    },
    querendengluye() {
      API.setdengluyelist({
        token: localStorage.getItem("token"),
        dengluyelist: this.dengluyelist
      }).then(({ data }) => {
        if (data.MSG == "YES") {
          this.$message.success({
            showClose: true,
            message: "设置登录页介绍成功！",
            duration: 2000
          });
        }
      });
    },
    querenyouqing() {
      API.setyouqinglist({
        token: localStorage.getItem("token"),
        youqinglist: this.youqinglist
      }).then(({ data }) => {
        if (data.MSG == "YES") {
          this.$message.success({
            showClose: true,
            message: "设置友情链接成功！",
            duration: 2000
          });
        }
      });
    },
    handleAddTask0() {
      this.dengluyelist.push({
        title: "",
        content: "",
        show: 0
      });
    },
    handleRemoveTask0(index) {
      this.dengluyelist.splice(index, 1);
    },
    handleAddTask1() {
      this.lunbotulist.push({
        url: "",
        content: "",
        show: 0
      });
    },
    handleRemoveTask1(index) {
      this.lunbotulist.splice(index, 1);
    },
    handleAddTask2() {
      this.youqinglist.push({
        title: "",
        url: ""
      });
    },
    handleRemoveTask2(index) {
      this.youqinglist.splice(index, 1);
    },
    guanbi() {
      this.lunbotu = 0;
      this.youqing = 0;
      this.dengluye = 0;
    },
    lunbotulunbotu() {
      this.lunbotu = 1;
      this.youqing = 0;
      this.dengluye = 0;
      API.getlunbotulist().then(({ data }) => {
        if (data.lunbotulist.length > 0) {
          this.lunbotulist = data.lunbotulist;
        }
        for (var i = 0; i < this.lunbotulist.length; ++i) {
          this.lunbotulist[i].show = 0;
        }
      });
    },
    dengluyedengluye() {
      this.lunbotu = 0;
      this.youqing = 0;
      this.dengluye = 1;
      API.getdengluyelist().then(({ data }) => {
        if (data.dengluyelist.length > 0) {
          this.dengluyelist = data.dengluyelist;
        }
        for (var i = 0; i < this.dengluyelist.length; ++i) {
          this.dengluyelist[i].show = 0;
        }
      });
    },
    youqingyouqing() {
      this.lunbotu = 0;
      this.youqing = 1;
      this.dengluye = 0;
      API.getyouqinglist().then(({ data }) => {
        if (data.youqinglist.length > 0) {
          this.youqinglist = data.youqinglist;
        }
      });
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
.upload {
  width: 30%;
}
.youqing {
  margin-left: 20%;
  width: 60%;
}
.dengluye {
  width: 100%;
}
</style>
