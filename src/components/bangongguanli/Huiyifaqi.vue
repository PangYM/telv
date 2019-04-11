<template>
  <div class="huiyifaqihuiyifaqi">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>会议发起</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-row class="huiyifaqi">
      <el-col :span="24">
        <el-form label-width="80px">
          <el-form-item label="会议主题">
            <el-input :disabled="!xiugai" v-model="form.biaoti" placeholder="请输入会议主题"></el-input>
          </el-form-item>
          <el-form-item label="会议地点">
            <el-input :disabled="!xiugai" v-model="form.didian" placeholder="请输入会议地点"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item label="发起人">
                <el-input disabled v-model="form.nigaoren" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              &nbsp;
            </el-col>
            <el-col :span="10">
              <el-form-item label="发起单位">
                <el-input disabled v-model="form.nigaodanwei" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="与会人员">
            <el-button type="primary" v-if="xiugai" @click="querensend">添加人员</el-button>
            <div class="renyuan" v-if="istongxinlu">
              <tree-transfer class="tongxinlu" :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :mode='mode' width="50%" height="500px" filter>
              </tree-transfer>
            </div>
            <li  v-bind="form.userlist" v-for="item in form.userlist" :key="item.name">
              <a style="color:#0000FF">{{item.name}}</a>
            </li>
          </el-form-item>
          <el-row>
            <el-col :span="6">
              <el-form-item label="会议日期">
                <el-date-picker :disabled="!xiugai"
                  v-model="form.riqi"
                  type="date"
                  style="width:100%;"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              &nbsp;
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始时间">
                <el-time-select
                  :disabled="!xiugai"
                  placeholder="起始时间"
                  v-model="form.starttime"
                  :picker-options="{
                    start: '08:00',
                    step: '00:15',
                    end: '20:00'
                  }">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              &nbsp;
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间">
                <el-time-select 
                  :disabled="!xiugai"
                  placeholder="结束时间"
                  v-model="form.endtime"
                  :picker-options="{
                    start: '08:00',
                    step: '00:15',
                    end: '22:00'
                  }">
                </el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input :disabled="!xiugai" type="textarea" v-model="form.beizhu" :rows="5"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="xiugai" type="primary" @click="onSubmit">立即发起</el-button>
            <el-button type="primary" @click="guanbi">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as API from '@/api';
import treeTransfer from 'el-tree-transfer';
export default {
  components: {
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
          this.form.riqi=this.form.riqi.slice(0, 10);
        });
  
      } else {
        API.getfawenhao().then(({
          data
        }) => {
          this.form.wendangid = data.wendangid + data.suiji;
          this.form.nigaoid = userdata.id;
          this.form.nigaoren = userdata.name;
          this.form.nigaodanwei = userdata.group;
        });
      }
  },
  data() {
    return {
      xiugai:1,
      istongxinlu: 0,
      title: ['未选列表', '已选列表'],
      mode: "transfer",
      fromData:[],
      toData:[],
      form: {
        doctype:'huiyi',
        zhuangtai:'',
        wendangid:'',
        biaoti: '',
        didian: '',
        nigaoid:'',
        nigaoren:'',
        userlist: [],
        riqi: '',
        starttime:'',
        endtime:'',
        beizhu:'',
      }
    };
  },
  methods: {
    guanbi(){
      this.$router.go(-1);
    },
    querensend() {
        this.istongxinlu = 1;
        API.gettongxinlu()
          .then(({
            data
          }) => {
            this.fromData = data.tongxinlu;
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
    onSubmit() {
      var fasongdata={
          'toData': this.toData,
          'wendang':this.form,
          'token':localStorage.getItem('token'),
        };
      API.fasongmindoc(fasongdata).then(({
          data
        }) => {
          this.$message.success({
              showClose: true,
              message: '发起成功',
              duration: 2000
            });
          this.$router.go(-1);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.huiyifaqihuiyifaqi{
  text-align: center;
}
.huiyifaqi{
  margin-top: 30px;
  width: 80%;
  margin-left: 10%;
}
</style>
