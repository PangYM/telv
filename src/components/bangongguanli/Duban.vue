<template>
  <div class="dubanduban">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>督办通知</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-row class="duban">
      <div v-if="xianshi">
      <el-col :span="23">
        <el-form ref="form" label-width="120px">
          <el-form-item>
            <el-button type="primary" v-if="xiugai" @click="querensend">发送</el-button>
            <el-button type="primary" v-if="yuedu" @click="querenyuedu">办理</el-button>
            <el-button type="primary" v-if="!xiugai" @click="piyuejilu">查看督办记录</el-button>
            <el-button type="primary" @click="guanbi(0)">关闭</el-button>
          </el-form-item>
          <div class="renyuan" v-if="istongxinlu">
            <tree-transfer class="tongxinlu" :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' width="50%" height="500px" filter>
            </tree-transfer>
            <el-button type="primary" @click="querenfasong()">确定发送</el-button>
            <el-button type="primary" @click="guanbi(1)">关闭</el-button>
          </div>
          <el-form-item label="交办事项">
            <el-input v-if="xiugai" v-model="form.biaoti" placeholder="请输入交办事项"></el-input>
            <div v-else class="xianshi">{{form.biaoti}}</div>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="督办类型">
                <el-select v-if="xiugai" v-model="form.jinji" placeholder="请选择督办类型" style="width:100%;">
                  <el-option label="决议" value="决议"></el-option>
                  <el-option label="命令" value="命令"></el-option>
                  <el-option label="议案" value="议案"></el-option>
                  <el-option label="指示" value="指示"></el-option>
                  <el-option label="通告" value="通告"></el-option>
                </el-select>
                <div v-else class="xianshi">{{form.jinji}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主办部门">
                <el-input v-if="xiugai" v-model="form.bumen" placeholder="请输入主办部门"></el-input>
                <div v-else class="xianshi">{{form.bumen}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="任务及负责人">
            <el-table
              :data="form.tasks"
              border
              stripe
              style="width: 100%">
              <el-table-column
                prop="title"
                align="center"
                label="任务描述">
                <template slot-scope="scope">
                  <el-input v-if="xiugai" v-model="scope.row.title" placeholder="请输入任务描述"></el-input>
                  <div v-else class="xianshi">{{scope.row.title}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="puser"
                label="责任人"
                align="center"
                width="300">
                <template slot-scope="scope">
                  <el-input v-if="xiugai" v-model="scope.row.puser" placeholder="请输入责任人"></el-input>
                  <div v-else class="xianshi">{{scope.row.puser}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="xiugai"
                label="操作"
                align="center"
                width="60">
                <template slot-scope="scope">
                  <el-button size="small" icon="el-icon-plus" @click="handleAddTask" v-if="scope.$index == form.tasks.length - 1" :disabled="form.tasks.length == 10 || !(scope.row.title && scope.row.puser)"></el-button>
                  <el-button size="small" icon="el-icon-minus" @click="handleRemoveTask(scope.$index)" v-else></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="备注" class="editer">
            <el-input v-if="xiugai" type="textarea" v-model="form.mark" :rows="5"></el-input>
            <div v-else class="xianshi">{{form.mark}}</div>
          </el-form-item>
          <el-form-item label="办结期限">
            <el-date-picker
              v-if="xiugai"
              v-model="form.riqi"
              value-format="yyyy-MM-dd"
              type="date"
              style="width:30%"
              placeholder="请选择办结期限">
            </el-date-picker>
            <div v-else class="xianshi">{{form.riqi}}</div> 
          </el-form-item>
          <el-form-item label="附件">
            <li v-bind="form.fileList" v-for="item in form.fileList" :key="item.name">
              <a target="_blank" :href="baseurl+'/data/fujian/'+form.wendangid+'/'+item.name">
                                                                              {{item.name}}
                                                                              </a>
            </li>
            <el-upload v-if="xiugai" drag ref="upload" :action="baocunfujian" :data="upload" :on-change="handlechange" :on-remove="handleremove" :file-list="form.fujianList" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将附件拖到此处，或<em>点击上传</em></div>
      </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
      </el-col>
      </div>
      <div v-else>
            <el-button type="primary" @click="piyuejilu">关闭</el-button>
    <el-table border :data="shenyuejilu" stripe style="width: 60%;margin-top:30px;margin-left:20%;" :default-sort = "{prop: 'caozuo', order: 'descending'}">
      <el-table-column sortable prop="name" align="center" width="200" label="人员">
      </el-table-column>
      <el-table-column sortable prop="endtime" align="center" width="200" label="结束时间">
      </el-table-column>
      <el-table-column sortable prop="caozuo" fixed="right" align="center" min-width="250" show-overflow-tooltip label="操作">
      </el-table-column>
    </el-table>
    </div>
    </el-row>
  </div>
</template>
<script>
import * as API from '@/api';
  import treeTransfer from 'el-tree-transfer';
  import {
    VueEditor
  } from 'vue2-editor';
  export default {
    components: {
      VueEditor,
      treeTransfer
    },
    created() {
      var userdata = JSON.parse(localStorage.getItem('userdata'));
      if (this.$route.query.wendangid) {
        API.getmindocid({
          'token': localStorage.getItem('token'),
          'wendangid': this.$route.query.wendangid
        }).then(({
          data
        }) => {
          this.form = data.data;
          this.xiugai = 0;
          this.yuedu = data.yuedu;
          this.upload.wendangid = this.form.wendangid;
          this.form.fujianList = [];
          for (var i = 0; i < this.form.fileList.length; ++i) {
            this.form.fujianList.push({
              'name': this.form.fileList[i].name,
              'url': this.baseurl + '/data/fujian/' + this.form.wendangid + '/' + this.form.fileList[i].name
            });
          }
        });
  
      } else {
        API.getfawenhao().then(({
          data
        }) => {
          this.form.wendangid = data.wendangid + data.suiji;
          this.upload.wendangid = this.form.wendangid;
          this.form.nigaoid = userdata.id;
          this.form.nigaoren = userdata.name;
          if(userdata.quanxian==30)
            this.hegao=1;
        });
      }
    },
  data() {
    return {
      shenyuejilu:[],
      istongxinlu:0,
      xianshi:1,
      xiugai:1,
      yuedu:0,
      title: ['未选列表', '已选列表'],
      mode: "transfer",
      fromData:[],
      toData:[],
      baseurl: API.base,
      loading: false,
      baocunfujian: API.baseurl + 'baocunfujian',
      upload: {},
      form: {
        doctype:'duban',
        wendangid:'',
        zhuangtai:'未完成',
        starttime:'',
        biaoti: '',
        jinji: '',
        bumen:'',
        tasks: [
          {
            title: '',
            name: ''
          }
        ],
        beizhu: '',
        riqi: this.getToday(),
        shenpihis:{},
        fileList: [],
        fujianList: [],
      }
    };
  },
  methods: {
    getToday(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    piyuejilu(){
        this.xianshi=1-this.xianshi;
        this.shenyuejilu=[];
        for(var i in this.form.shenpihis){
          this.shenyuejilu.push(this.form.shenpihis[i]);
        }
      },
    querenyuedu(){
        API.mindocyiyue({
          'token': localStorage.getItem('token'),
          'wendangid': this.$route.query.wendangid
        }).then(({
          data
        }) => {
          this.$message.success({
                showClose: true,
                message: '办理成功！',
                duration: 2000
              });
          this.yuedu=0;
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
            'name': fileList[i].name
          });
        }
      },
      handleremove(file, fileList) {
        this.form.fileList = [];
        for (var i = 0; i < fileList.length; ++i) {
          this.form.fileList.push({
            'name': fileList[i].name
          });
        }
      },
    querenfasong() {
        if(this.toData.length==0){
          this.$message({
            showClose: true,
            message: '请选择发送人',
            duration: 2000
          });
          return "";
        }
        this.loading = true;
        var fasongdata={
          'toData': this.toData,
          'wendang':this.form,
          'token':localStorage.getItem('token'),
        };
        API.fasongmindoc(fasongdata)
          .then(({
            data
          }) => {
            this.loading=false;
            this.$message.success({
              showClose: true,
              message: '发送成功',
              duration: 2000
            });
            this.$router.push({
              path: '/main',
            });
          });
      },
    guanbi(e) {
        if (e == 0) {
          this.$router.go(-1);
        } else {
          this.istongxinlu = 0;
        }
      },
    querensend() {
      this.istongxinlu = 1;
      API.gettongxinlu({'token': localStorage.getItem('token')})
        .then(({
          data
        }) => {
          this.fromData = data.tongxinlu;
        });
    },
    handleAddTask() {
      this.form.tasks.push({
        title: '',
        puser: ''
      });
    },
    handleRemoveTask(index) {
      this.form.tasks.splice(index, 1);
    },
  }
};
</script>
<style lang="scss">
.duban {
  margin: 25px 0;
  text-align: center;
  width: 80%;
  margin-left: 10%;
}
.xianshi{
  background: #efefef;
}
</style>
