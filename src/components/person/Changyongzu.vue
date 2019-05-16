<template>
  <div class="oa_main">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人事务</el-breadcrumb-item>
          <el-breadcrumb-item>常用组</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-row class="send_file">
      <div class="fasong">
        <div>
          <el-tree
            class="eltree"
            :data="changyongzulist"
            show-checkbox
            node-key="id"
            default-expand-all
            expand-on-click-node
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" @click="eltreeremove(node, data)">删除</el-button>
              </span>
            </span>
          </el-tree>
          <el-button v-if="xiugai" class="xiugai" type="primary" @click="querenxiugai">确认修改</el-button>
        </div>
        <el-button type="primary" @click="tianjia">新建常用组</el-button>
        <el-button type="primary" @click="guanbi(0)">关闭</el-button>
        <div class="renyuan" v-if="istongxinlu">
          <el-input class="changyongzu" v-model="changyongzu" placeholder="请输入常用组名字"></el-input>
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
          <el-button type="primary" @click="querenfasong()">确定新建</el-button>
          <el-button type="primary" @click="guanbi(1)">关闭</el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import * as API from "@/api";
import treeTransfer from "el-tree-transfer";
import axios from "axios";
export default {
  components: {
    treeTransfer
  },
  mounted() {
    API.getchangyongzu({ token: localStorage.getItem("token") }).then(
      ({ data }) => {
        this.changyongzulist = data.changyongzulist;
      }
    );
  },
  data() {
    return {
      xiugai: 0,
      istongxinlu: 0,
      title: ["未选列表", "已选列表"],
      mode: "transfer",
      istongxinlu: 0,
      changyongzu: "",
      changyongzulist: [],
      fromData: [],
      toData: []
    };
  },
  methods: {
    querenxiugai() {
      API.xiugaichangyongzu({
        token: localStorage.getItem("token"),
        changyongzulist: this.changyongzulist
      }).then(({ data }) => {
        this.$message.success({
          showClose: true,
          message: "修改成功",
          duration: 2000
        });
      });
    },
    eltreeremove(node, data) {
      this.xiugai = 1;
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    querenfasong() {
      if (this.changyongzu.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入常用组名",
          duration: 2000
        });
        return "";
      }
      if (this.toData.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择发送人",
          duration: 2000
        });
        return "";
      }
      var fasongdata = {
        toData: this.toData,
        changyongzu: this.changyongzu,
        token: localStorage.getItem("token")
      };
      API.setchangyongzu(fasongdata).then(({ data }) => {
        if (data.MSG == "NO") {
          this.$message({
            showClose: true,
            message: "常用组名不合法！",
            duration: 2000
          });
        } else {
          this.changyongzulist = data.changyongzulist;
          this.$message.success({
            showClose: true,
            message: "发送成功",
            duration: 2000
          });
          this.guanbi(1);
        }
      });
    },
    tianjia() {
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
  .eltree {
    margin-left: 25%;
    width: 50%;
    margin-bottom: 30px;
  }
}
.xiugai {
  margin-bottom: 30px;
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
  text-align: center;
  .changyongzu {
    width: 50%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .tongxinlu {
    margin-left: 25%;
  }
}
</style>
