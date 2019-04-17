<template>
  <div class="wenjianwenjian">
    <!--面包屑-->
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>办公管理</el-breadcrumb-item>
          <el-breadcrumb-item>部门文件</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--list-->
    <el-cascader
      class="selecteblock"
      placeholder="文件搜索"
      :options="options"
      v-model="selectedOptions"
      filterable
      clearable
      change-on-select
      @change="nowlabel"
    ></el-cascader>
    <div class="main">
            <!--顶部工具栏-->
            <div class="toolbar">
                <div class="layout clearfix">
                        <div class="action-wrap action-wrap-upload">
                          <el-upload ref="upload" :limit="1000" :on-success="onsuccess" :show-file-list="false" :action="baocunwenjian" :data="upload" multiple>
                        <div class="action-item">
                            <i class="icon icon-upload-s"></i>
                            <span class="act-txt">上传</span>
                        </div>
                        </el-upload>
                    </div>
                    <div @click="xinjian" class="action-wrap">
                        <div class="action-item">
                            <i class="icon icon-add"></i>
                            <span class="act-txt">新建</span>
                        </div>
                    </div>
                    <div @click="shanchu" class="action-wrap">
                        <div class="action-item">
                            <i class="icon icon-trash"></i>
                            <span class="act-txt">删除</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--主体内容-->
            <div class="main-body">
                <div class="hd">
                    <div class="right clearfix">
                        <div class="action-wrap">
                            <div @click="changeShowMode('list')" class="action-item" :class="{act:showMode=='list'}">
                                <i class="icon icon-mod-list"></i>
                                <span class="act-txt">列表</span>
                            </div>
                        </div>
                        <div class="action-wrap">
                            <div @click="changeShowMode('thumb')" class="action-item" :class="{act:showMode=='thumb'}">
                                <i class="icon icon-mode-thumb"></i>
                                <span class="act-txt">缩略图</span>
                            </div>
                        </div>
                    </div>
                    <ul class="breadcrumb clearfix">
                        <a @click="xuanze(0)" href="#/bangongguanli/bumenwenjian">全部 <i class="icon icon-bread-next"></i></a>
                        <li v-bind="selectedOptions1" v-for="(item,index) in selectedOptions1">
                          <a @click="xuanze(index+1)" v-if="index<selectedOptions1.length-1" href="#/bangongguanli/bumenwenjian">{{item.label}} <i class="icon icon-bread-next"></i></a>
                          <a v-else style="font-weight:bold;" href="#/bangongguanli/bumenwenjian">{{item.label}}</a>
                        </li>
                        <div style="margin-left:500px;">{{files.length}}个项目</div>
                    </ul>
                </div>
                <div class="list-wrap">
                    <!--列表头部-->
                    <div class="list-header clearfix">
                        <div @click="quanxuan" class="col checkbox">
                            <!--icon-checkbox,icon-checkbox-hover,icon-checkbox-cur-->
                            <i v-if="quanxuanlabel==0" class="icon icon-checkbox"></i>
                            <i v-else class="icon icon-checkbox-cur"></i>
                        </div>
                        <div class="col col-border name" style="display: block;">
                            <strong>名称</strong>
                        </div>

                    </div>
                    <!--列表头部end-->
                    <!--正文，缩略图-->
                    <div v-if="showMode == 'thumb'" class="list-item-wrap list-item-wrap-thumb">

                        <ul class="list-item clearfix">
                            <li v-bind="this.files" class="item" v-for="file of folderFiles">
                                <div @click="select(file.label)" @dblclick="querendakai(file)" class="inner">
                                    <i class="icon-wrapper">
                                        <i class="icon icon-file-l"></i>
                                    </i>
                                    <span title="a4" class="txt">{{file.label}}</span>
                                    <i v-if="file.select" class="icon checkbox icon-checkbox-cur"></i>
                                </div>
                            </li>
                        </ul>
                        <ul class="list-item clearfix">
                            <li v-bind="this.files" v-for="file of otherFiles" class="figure-list-item">
                                <div @click="select(file.label)" @dblclick="querendakai(file)" class="figure-list-item-inner">
                                    <div class="figure-list-item-pic">
                                        <div class="img-wrapper">
                                            <i class="icon icon-l icon-nor-l"></i>
                                        </div>
                                    </div>
                                    <i v-if="file.select" class="icon checkbox icon-checkbox-cur"></i>
                                    <div class="figure-list-item-txt">
                                        <p class="tit">{{file.label}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--列表模式-->
                    <div v-else class="list-item-wrap list-item-wrap-list clearfix">
                        <div v-bind="this.files" class="row clearfix" v-for="file of folderFiles">
                            <div class="col checkbox-wrap">
                                <!--icon-checkbox,icon-checkbox-hover,icon-checkbox-cur-->
                                <i v-if="file.select" class="icon checkbox icon-checkbox-cur"></i>
                            </div>
                            <div @click="select(file.label)" @dblclick="querendakai(file)" class="col col-border name"><i class="icon checkbox icon-nor-m"></i>{{file.label}}</div>
                        </div>
                        <div v-bind="this.files" class="row clearfix" v-for="file of otherFiles">
                            <div class="col checkbox-wrap">
                                <!--icon-checkbox,icon-checkbox-hover,icon-checkbox-cur-->
                                <i v-if="file.select" class="icon checkbox icon-checkbox-cur"></i>
                            </div>
                            <div @click="select(file.label)" @dblclick="querendakai(file)" class="col col-border name">{{file.label}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import * as API from '@/api';
  export default {
    computed: {
        // 每一个计算属性都是一个函数，函数的返回值就是这个函数对应的属性的值，计算属性使用的时候，使用的是方法对应的属性
        folderFiles() {
            return this.showType == 'all' ? this.files.filter( file => file.type == '' ) : [];
        },
        otherFiles() {
            return this.files.filter( file => file.type != '' );
        }
    },
    created() {
      var userdata = JSON.parse(localStorage.getItem('userdata'));
      this.userid=userdata.id;
      API.huoqubumenwenjian({
                        'token': localStorage.getItem('token')}).then(({
                        data
                        }) => {
                            this.options=data.options;
                            this.files=this.options;                        
                        });
    },
  data() {
    return {
        quanxuanlabel:0,
        baseurl: API.base,
        loading: false,
        userid:'',
        baocunwenjian: API.baseurl + 'baocunwenjian',
        upload: {'selectedOptions':'[]','token':localStorage.getItem('token')},
        selectedOptions:[],
        selectedOptions1:[],
        // 显示模式：缩略图、列表
        showMode: 'thumb',
        // 显示的文件类型
        showType: 'all',
        // 所有的文件夹、文件信息
        options:[],  
      files: [
      ],
    };
  },
  methods: {
      shanchu(){
          for(var i=0;i<this.files.length;++i){
              if(this.files[i].select==1){
                  if(this.files[i].userid!=this.userid){
                      this.$message({
                            type: 'info',
                            message: this.files[i].label+'不是您上传的，您无权限删除',
                        }); 
                  }
              else{
                API.wenjianshanchu({
                    'token': localStorage.getItem('token'),
                    'selectedOptions':this.selectedOptions,
                    'value':this.files[i].value,
                    }).then(({
                    data
                    }) => {
                        this.options=data.options;
                        this.files=data.files;
                        this.$message({
                        type: 'success',
                        message: this.files[i]['label']+'删除成功'
                        });
                    });
                } 
              }
          }
      },
      onsuccess(response, file, fileList){
          if(response.MSG=='NO'){
              this.$message({
                            type: 'info',
                            message: '当前文件夹已存在相同的文件名，文件名为'+response.label,
                        });  
          }
          else{
                this.options=response.options;
                this.files=response.files;
          }
      },
      quanxuan(){
          this.quanxuanlabel=1-this.quanxuanlabel;
          for(var i=0;i<this.files.length;++i){
            this.files[i].select=this.quanxuanlabel;
        }
      },
      xinjian(){
          this.$prompt('请输入新建文件夹名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            if(value==null){
                this.$message({
                    type: 'info',
                    message: '文件夹名称不能为空'
                });  
            }
            else{
                var flag=1;
                for(var i=0;i<this.files.length;++i){
                    if(this.files[i].label==value&&this.files[i].type==''){
                        this.$message({
                            type: 'info',
                            message: '新建名称与已有文件名重复'
                        });  
                        flag=0;
                    }
                }
                if(flag){
                    API.xinjianwenjianjia({
                        'token': localStorage.getItem('token'),
                        'selectedOptions':this.selectedOptions,
                        'label':value,
                        }).then(({
                        data
                        }) => {
                            this.options=data.options;
                            this.files.push({'value': data.value, 'label': value, 'type': '', 'select': 0, 'children': [], 'userid': data.userid});
                        });
                    this.$message({
                        type: 'success',
                        message: '新建成功'
                    });
                }
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消新建'
          });       
        });
      },
      querendakai(file){
          if(file.type==''){
                this.files=file.children;
                this.selectedOptions1.push({'label':file.label});
                this.selectedOptions.push(file.label);
                this.upload.selectedOptions=JSON.stringify(this.selectedOptions);
          }
          else{
              window.open(API.base + '/data/bumenwenjian/'+file.value+'/'+file.label);
          }
      },
    select(label){
        for(var i=0;i<this.files.length;++i){
            if(this.files[i].label==label){
                this.files[i].select=1-this.files[i].select;
                break;
            }
        }
    },
    xuanze(e){
        if(e==0){
            this.selectedOptions=[];
            this.selectedOptions1=[];
            this.files=this.options;
            this.upload.selectedOptions=JSON.stringify(this.selectedOptions);
        }
        else{
            this.files=this.options;
            for(var i=0;i<e;++i){
                for(var j=0;j<this.files.length;++j){
                    if(this.files[j].label==this.selectedOptions1[i].label){
                        this.files=this.files[j].children;
                        break;
                    }
                }
            }
            this.selectedOptions1=this.selectedOptions1.splice(0,e);
            this.selectedOptions=this.selectedOptions.splice(0,e);
            this.upload.selectedOptions=JSON.stringify(this.selectedOptions);
        }
    },
    changeShowMode(type) {
      this.showMode = type;
    },
    changeShowType(type) {
      this.showType = type;
    },
    nowlabel(val){
        this.upload.selectedOptions=JSON.stringify(this.selectedOptions);
        this.selectedOptions1=[];
        this.files=this.options;
      for(var i=0;i<val.length;++i){
          for(var j=0;j<this.files.length;++j){
              if(this.files[j].label==val[i]){
                this.files=this.files[j].children;
                break;
              }
          }
          this.selectedOptions1.push({'label':val[i]});
      }
    },
  }
};
</script>
<style lang="scss">
.selecteblock{
  margin-top: 30px;
  width: 1000px;
}
.wenjian {
  margin: 25px 0;
  text-align: center;
}
html,body {
    height: 100%;
    // overflow: hidden;
}
body, ul, p {
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
}
li {
    list-style: none;
}
.clearfix:after {
    content: '';
    display: block;
    clear: both;
}

.icon {
    position: relative;
    top: -1px;
    margin: 0 14px 0 0;
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
}
.aside {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 240px;
    background: #F4F4F4;
}
.main {
    height: calc(100vh);
}
/*aside*/
.aside .header {
    text-align: center;
}
.aside .header a {
    color: black;
    letter-spacing: 10px;
}

/*图标*/
.icon-all {
    background-image: url(../images/svg/icon-all.svg);
}
.cur .icon-all {
    background-image: url(../images/svg/icon-all-act.svg);
}
.icon-doc {
    background-image: url(../images/svg/icon-doc.svg);
}
.cur .icon-doc {
    background-image: url(../images/svg/icon-doc-act.svg);
}
.icon-pic {
    background-image: url(../images/svg/icon-pic.svg);
}
.cur .icon-pic {
    background-image: url(../images/svg/icon-pic-act.svg);
}
.icon-video {
    background-image: url(../images/svg/icon-video.svg);
}
.cur .icon-video {
    background-image: url(../images/svg/icon-video-act.svg);
}
.icon-music {
    background-image: url(../images/svg/icon-music.svg);
}
.act .icon-music {
    background-image: url(../images/svg/icon-music-act.svg);
}
.icon-upload-s {
    background-image: url(../images/svg/icon-upload-s.svg);
}
.icon-add {
    background-image: url(../images/svg/act/icon-add.svg);
}
.icon-trash {
    background-image: url(../images/svg/act/icon-trash.svg);
}
.icon-mod-list {
    background-image: url(../images/svg/icon-mode-list.svg);
}
.act .icon-mod-list {
    background-image: url(../images/svg/icon-mode-list-act.svg);
}
.icon-mode-thumb {
    background-image: url(../images/svg/icon-mode-thumb.svg);
}
.act .icon-mode-thumb {
    background-image: url(../images/svg/icon-mode-thumb-act.svg);
}
.icon-checkbox {
    background-image: url(../images/svg/icon-checkbox-hover.svg);
}
.icon-checkbox-cur {
    background-image: url(../images/svg/icon-checkbox-cur.svg);
}
.icon-checkbox-cur2 {
    background-image: url(../images/svg/icon-checkbox-act.svg);
}
.icon-sort {
    background-image: url(../images/svg/icon-sort.svg);
}
.icon-file-l {
    width: 100px;
    height: 80px;
    background-image: url(../images/svg/doctype/icon-file-l.svg);
}
.icon-nor-m{
    background-image: url(../images/svg/doctype/icon-file-m.svg);
}
/*menu-list*/
.menu-list {
    margin: 0;
}
.menu-list li a {
    position: relative;
    padding-left: 34px;
    display: block;
    height: 32px;
    line-height: 32px;
}
.menu-list li.cur a {
    text-decoration: none;
    background: 0 0;
    color: #2980FF;
    font-weight: 700;
}
.menu-list li a:hover {
    text-decoration: none;
    background: #EAEAEA;
    transition: ease all;
    transition-duration: .3s;
}
.menu-list li.cur a:hover {
    background: 0 0;
}
.menu-list li.cur a:before {
    position: absolute;
    content: "";
    left: 0;
    width: 4px;
    height: 28px;
    top: 50%;
    margin: -14px 0 0;
    background: #2980FF;
}

.action-wrap {
    position: relative;
    float: left;
    margin: 14px 16px 0 0;
    padding: 0 20px;
    border: 1px solid #DBDBDB;
    border-radius: 2px;
    cursor: pointer;
    height: 34px;
    line-height: 34px;
}
.action-wrap .icon {
    margin: 0;
}

.action-wrap-upload {
    background-color: #2980FF;
    border-color: #2980FF;
    color: #fff;
}
.action-wrap-upload:hover {
    background-color: #2977EA;
}

/*顶部工具栏*/
.toolbar {
    border-bottom: 1px solid #DBDBDB;
}
.toolbar .layout {
    position: relative;
    z-index: 10;
    margin-left: 50px;
    height: 64px;
}

/*主体内容*/
.main-body {
    height: calc(100vh - 64px);
    min-width: 630px;
}

/*主体头部*/
.main-body .hd {
    position: relative;
    z-index: 2;
    padding: 0 60px 0 50px;
    box-sizing: border-box;
    height: 48px;
    line-height: 48px;
}
/*主体头部右侧*/
.main-body .right {
    float: right;
}
.main-body .right .action-wrap {
    padding: 0;
    border: none;
}
.main-body .right .action-wrap .act-txt {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background-color: #4D4D4D;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    padding: 0 8px;
    height: 22px;
    line-height: 22px;
    // display: none;
}
.main-body .right .action-wrap:hover .act-txt {
    display: block;
}
/*面包屑*/
.main-body .breadcrumb {
    padding: 0;
    position: relative;
    left: -5px;
    overflow: hidden;
    display: flex;
}
.main-body .breadcrumb .item {
    transition: flex-shrink .3s;
    flex-basis: auto;
    flex-shrink: 1;
    min-width: 41px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    color: #777;
}
.main-body .breadcrumb .item a {
    padding: 4px 5px;
    color: #777;
}
.main-body .breadcrumb .item a:hover {
    text-decoration: underline;
}
.main-body .breadcrumb .item.all {
    min-width: 38px;
}
.main-body .breadcrumb .item.cur a {
    color: #000;
    font-weight: 700;
}
.main-body .breadcrumb .icon-bread-next {
    width: 7px;
    height: 12px;
    margin: 2px 2px 0;
    background-image: url(../images/svg/icon-bread-next.svg);
}

/*内容*/
.list-wrap {
    padding: 0 80px 0 10px;
}
.list-header {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
}
.list-header:hover {
    background-color: rgb(244, 244, 244);
}
.list-header .col {
    float: left;
}
.list-header .col.checkbox {
    float: left;
    padding-left: 10px;
    width: 30px;
    height: 40px;
}
.list-header .col.checkbox .icon-checkbox {
    top: 1px;
    // display: none;
}
.list-header:hover .col.checkbox .icon-checkbox {
    display: inline-block;
}
.col.col-border {
    border-bottom: 1px solid #D8DCE5;
}

.list-header .col.name {
    width: calc(100% - 40px);
    font-size: 14px;
}
.list-header .col.info {
    width: calc(100% - 40px);
    font-size: 14px;
}


.list-item-wrap {
    margin-left: 10px;
    padding: 10px;
    height: calc(((100vh - 65px) - 48px) - 40px);
    overflow: auto;
}

/*缩略图*/
.list-item-wrap-thumb .list-item .item {
    position: relative;
    float: left;
    display: list-item;
    width: 110px;
    height: 150px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
}
.list-item-wrap-thumb .list-item .item.cur, .list-item-wrap-thumb .list-item .item:hover {
    background-color: rgb(244,244,244);
}
.list-item-wrap-thumb .list-item .item .inner {
    position: relative;
    z-index: 3;
    display: block;
    padding-bottom: 16px;
    cursor: default;
}
.list-item-wrap-thumb .list-item .item .icon-wrapper {
    display: block;
    position: relative;
    z-index: 0;
    width: 100%;
    padding-top: 80%;
}
.list-item-wrap-thumb .list-item .item .icon-wrapper .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -40px 0 0 -50px;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
}
.list-item-wrap-thumb .list-item .item .inner .txt {
    text-align: center;
    color: rgb(2, 2, 2);
    font-size: 14px;
    max-height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0px auto;
}
.list-item-wrap-thumb .list-item .item .inner .txt:hover {
    text-decoration: underline;
}
.list-item-wrap-thumb .list-item .item .checkbox {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 9;
    margin: 0;
    // display: none;
}
.list-item-wrap-thumb .list-item .item.cur .checkbox, .list-item-wrap-thumb .list-item .item:hover .checkbox {
    display: inline-block;
}
/*figure-item*/
.list-item-wrap-thumb .figure-item {
    position: relative;
    z-index: 0;
    padding: 12px 0 0;
}
.list-item-wrap-thumb .figure-list-item {
    position: relative;
    display: inline-block;
    vertical-align: top;
    padding-right: 1px;
    margin-bottom: 10px;
    cursor: default;
    overflow: hidden;
    box-sizing: border-box;
    width: 150px;
}
.list-item-wrap-thumb .figure-list-item:hover, .list-item-wrap-thumb .figure-list-item.cur {
    background-color: rgb(244,244,244);
}
.list-item-wrap-thumb .figure-list-item-inner {
    padding-bottom: 16px;
    width: 100%;
    border-radius: 2px;
}
.list-item-wrap-thumb .checkbox {
    position: absolute;
    z-index: 10;
    top: 10px;
    right: 0;
    cursor: default;
    margin: 0;
    // display: none;
}
.list-item-wrap-thumb .figure-list-item.cur .figure-list-item-inner .checkbox, .list-item-wrap-thumb .figure-list-item:hover .figure-list-item-inner .checkbox{
    display: block;
}
/*.list-item-wrap .figure-list-item.cur .figure-list-item-inner .icon-checkbox{*/
    /*display: block;*/
    /*background-image: url(../images/svg/icon-checkbox-cur.svg);*/
/*}*/
.list-item-wrap-thumb .figure-list-item-pic {
    position: relative;
    z-index: 0;
    padding-bottom: 1px;
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    border-radius: 2px;
    font-size: 0;
    text-align: center;
}
.list-item-wrap-thumb .img-wrapper {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 100%;
}
.list-item-wrap-thumb .img-wrapper:before {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
}
.list-item-wrap-thumb .figure-list-item-pic .icon-l {
    position: absolute;
    left: 50%;
    display: inline-block;
    width: 134px;
    height: 134px;
    margin: -67px 0 0 -67px;
    box-sizing: border-box;
    cursor: pointer;
    top: 50%;
    color: transparent;
    font-size: 0;
    background-repeat: no-repeat;
}
.list-item-wrap-thumb .figure-list-item-pic .icon-l:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
}
.list-item-wrap-thumb .figure-list-item-pic .icon-l:after {
    content: "";
    display: block;
    padding-top: 100%;
}
.list-item-wrap-thumb .figure-list-item .figure-list-item-txt .tit {
    overflow: hidden;
    width: 84%;
    margin: 0 auto;
    text-align: center;
    color: #020202;
    font-size: 14px;
    max-height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.list-item-wrap-thumb .icon-nor-l::before {
    background-image: url(../images/svg/doctype/icon-nor-l.svg);
}

/*列表模式*/
.list-item-wrap-list {
    margin-left: 0;
    padding: 0 1px 0 0;
}
.list-item-wrap-list .row {
    position: relative;
    line-height: 40px;
}
.list-item-wrap-list .row:hover {
    background-color: rgb(244, 244, 244);
}
.list-item-wrap-list .row.cur {
    background-color: #308EFF;
    color: white;
}
.list-item-wrap-list .col {
    float: left;
}
.list-item-wrap-list .col.name {
    padding: 10px 0;
    width: calc(100% - 40px);
}
.list-item-wrap-list .checkbox-wrap {
    position: relative;
    top: 2px;
    float: left;
    padding: 10px 0 10px 10px;
    width: 30px;
    height: 40px;
}
.list-item-wrap-list .checkbox-wrap .checkbox {
    // display: none;
}
.list-item-wrap-list .row.cur .checkbox-wrap .checkbox, .list-item-wrap-list .row:hover .checkbox-wrap .checkbox {
    display: inline-block;
}


/*画框*/
.draw-selector {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    background-color: rgba(100,100,100,.2);
}
</style>
