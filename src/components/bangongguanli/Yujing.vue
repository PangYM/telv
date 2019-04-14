<template>
  <div class="yujingyujing">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增预警</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--form-->
    <el-row class="yujing">
        <el-form label-width="80px">
          <el-row>
              <el-form-item label="预警标题">
                <el-input :disabled="!xiugai" v-model="form.biaoti" placeholder="请输入预警标题"></el-input>
              </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发起人">
                <el-input disabled v-model="form.nigaoren" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发起部门">
                <el-input disabled v-model="form.nigaodanwei" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="紧急程度">
                <el-select :disabled="!xiugai" v-model="form.jinji" placeholder="请选择紧急程度" style="width:100%;">
                  <el-option label="普通" value="普通"></el-option>
                  <el-option label="紧急" value="紧急"></el-option>
                  <el-option label="非常紧急" value="非常紧急"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间">
                <el-date-picker :disabled="!xiugai"
                  value-format="yyyy-MM-dd"
                  v-model="form.starttime"
                  type="date"
                  style="width:100%;"
                  placeholder="开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <el-date-picker :disabled="!xiugai"
                  value-format="yyyy-MM-dd"
                  v-model="form.endtime"
                  type="date"
                  style="width:100%;"
                  placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" class="editer">
            <el-input :disabled="!xiugai"
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="form.beizhu">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="xiugai" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button v-if="xiugai==0&&form.zhuangtai=='未处理'" type="primary" @click="wancheng">处理完成</el-button>
            <el-button type="primary" @click="guanbi">关闭</el-button>
          </el-form-item>
        </el-form>
    </el-row>
  </div>
</template>
<script>
import * as API from '@/api';
export default {
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
      form: {
        doctype:'yujing',
        zhuangtai:'未处理',
        wendangid:'',
        biaoti:'',
        nigaoid: '',
        nigaoren:'',
        nigaodanwei:'',
        jinji:'',
        starttime: new Date().toLocaleString().slice(0,10),
        endtime: new Date().toLocaleString().slice(0,10),
        beizhu: ''
      }
    };
  },
  methods: {
    wancheng(){
      API.wanchengmindoc({'token':localStorage.getItem('token'),'wendangid':this.form.wendangid}).then(({
          data
        }) => {
          this.$message.success({
              showClose: true,
              message: '处理成功！',
              duration: 2000
            });
          this.form.zhuangtai='处理完成';
        });
    },
    guanbi(){
      this.$router.go(-1);
    },
    onSubmit() {
      API.fasongmindoc({'token':localStorage.getItem('token'),'wendang':this.form}).then(({
          data
        }) => {
          this.$message.success({
              showClose: true,
              message: '创建成功',
              duration: 2000
            });
          this.$router.go(-1);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.yujingyujing{
  text-align: center;
}
.yujing{
  margin-top: 30px;
  margin-left: 20%;
  width: 60%;
}
</style>
