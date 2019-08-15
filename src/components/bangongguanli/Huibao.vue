<template>
    <div class="huibaohuibao">
        <!--面包屑-->
        <el-row>
            <el-col :span="24" class="warp-breadcrum">
                <el-breadcrumb>
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">办公管理</el-breadcrumb-item>
                    <el-breadcrumb-item>月度汇报</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <!--list-->
        <div v-if="xianshi">
            <div class="dayin">
                <el-button type="primary" v-if="xiugai" @click="querenfasong(0)">保存</el-button>
                <el-button type="primary" v-if="yuedu" @click="querenyuedu">审批</el-button>
                <el-button type="primary" v-if="xiugai" :loading="loading" @click="querensend">发送</el-button>
                <el-button type="primary" v-if="!xiugai" @click="piyuejilu">查看批阅记录</el-button>
                <el-button type="primary" v-print="'#huibao'">打印</el-button>
                <el-button type="primary" @click="guanbi(0)">关闭</el-button>
            </div>
            <div class="renyuan" v-if="istongxinlu">
                <tree-transfer class="tongxinlu" :title="title" :from_data="fromData" :to_data="toData" :defaultProps="{label:'label'}" @addBtn="add" @removeBtn="remove" :mode="mode" width="50%" height="500px" filter></tree-transfer>
                <el-button type="primary" @click="querenfasong(1)">确定发送</el-button>
                <el-button type="primary" @click="guanbi(1)">关闭</el-button>
            </div>
            <el-row class="huibao" id="huibao">
                <div class="bantou">
                    铁旅集团月度工作任务写实表
                </div>
                <div class="riqi">
                    部门：
                    <a class="riqi1" style="color:#000000">{{form.nigaodanwei}}</a> 姓名：
                    <a class="riqi1" style="color:#000000">{{form.nigaoren}}</a> 职位：
                    <a class="riqi1" style="color:#000000">{{form.zhiweiname}}</a> 日期：
                    <el-date-picker class="riqi1" value-format="yyyy-MM-dd" v-if="xiugai" v-model="form.riqi" type="date" placeholder="选择日期"></el-date-picker>
                </div>
                <div class="kuang">
                    <div class="kuang1">
                        <div class="kuang11">月度工作情况</div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.gongzuoqingkuang" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.gongzuoqingkuang}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">标题</div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.biaoti" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.biaoti}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            领导批示
                        </div>
                        <div class="kuang12">
                            <li v-bind="form.qianyuelist" v-for="item in form.qianyuelist" :key="item.name">
                                <a style="color:#000000">{{item.name}} {{item.time}} {{item.yijian}}</a>
                            </li>
                            <el-input v-if="yuedu" type="textarea" v-model="banli" :autosize="true"></el-input>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            年度任务
                        </div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.niandurenwu" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.yuanyin}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            本月完成
                        </div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.benyuewancheng" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.benyuewancheng}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            累计完成数
                        </div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.leijiwanchengshu" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.leijiwanchengshu}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            时间进度
                        </div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.shijianjindu" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.shijianjindu}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            上月领导批示
                            <Br/>及落实情况
                        </div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.luoshiqingkuang" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.luoshiqingkuang}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            次月工作计划
                        </div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.gongzuojihua" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.gongzuojihua}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            存在问题
                        </div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.cunzaiwenti" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.cunzaiwenti}}</a>
                        </div>
                    </div>
                    <div class="kuang1">
                        <div class="kuang11">
                            意见建议
                        </div>
                        <div class="kuang12">
                            <el-input v-if="xiugai" type="textarea" :autosize="true" v-model="form.yijianjianyi" placeholder></el-input>
                            <a v-else style="color:#000000">{{form.yijianjianyi}}</a>
                        </div>
                    </div>
                    <div class="fujian">
                        <div class="fujian1">附件</div>
                        <div class="fujian2">
                            <li v-bind="form.fileList" v-for="item in form.fileList" :key="item.name">
                                <a target="_blank" :href="baseurl+'/data/fujian/'+form.wendangid+'/'+item.name">{{item.name}}</a>
                            </li>
                        </div>
                    </div>
                </div>
            </el-row>
            <div v-if="xiugai" class="upload">
                <el-upload drag ref="upload" :action="baocunfujian" :data="upload" :on-change="handlechange" :on-remove="handleremove" :file-list="form.fujianList" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将附件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
        </div>
        <div v-else>
            <el-button type="primary" @click="piyuejilu">关闭</el-button>
            <el-table border :data="form.shenpihis" stripe style="width: 100%;margin-top:30px;" :default-sort="{prop: 'name', order: 'descending'}">
                <el-table-column sortable prop="name" align="center" width="200" label="人员"></el-table-column>
                <el-table-column sortable prop="wancheng" align="center" min-width="250" show-overflow-tooltip label="操作"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import * as API from '@/api';
    import treeTransfer from 'el-tree-transfer';
    export default {
        components: {
            treeTransfer
        },
        mounted() {
            var userdata = JSON.parse(localStorage.getItem('userdata'));
            if (this.$route.query.wendangid) {
                API.getmindocid({
                    token: localStorage.getItem('token'),
                    wendangid: this.$route.query.wendangid
                }).then(({
                    data
                }) => {
                    this.form = data.data;
                    this.xiugai = data.xiugai;
                    this.yuedu = data.yuedu;
                    this.upload.wendangid = this.form.wendangid;
                    this.form.fujianList = [];
                    for (var i = 0; i < this.form.fileList.length; ++i) {
                        this.form.fujianList.push({
                            name: this.form.fileList[i].name,
                            url: this.baseurl + '/data/fujian/' + this.form.wendangid + '/' + this.form.fileList[i].name
                        });
                    }
                });
            } else {
                API.getfawenhao().then(({
                    data
                }) => {
                    this.form.wendangid = data.wendangid + data.suiji;
                    this.upload.wendangid = this.form.wendangid;
                    this.form.nigaouserid = userdata.userid;
                    this.form.nigaoren = userdata.name;
                    this.form.nigaodanwei = userdata.group;
                    this.form.zhiweiname = userdata.zhiweiname;
                });
            }
            API.gettongxinlu({
                token: localStorage.getItem('token')
            }).then(({
                data
            }) => {
                this.fromData = data.tongxinlu;
            });
        },
        data() {
            return {
                xianshi: 1,
                xiugai: 1,
                yuedu: 0,
                banli:'',
                title: ['未选列表', '已选列表'],
                mode: 'transfer',
                istongxinlu: 0,
                fromData: [],
                toData: [],
                baseurl: API.base,
                loading: false,
                baocunfujian: API.baseurl + 'baocunfujian',
                upload: {},
                form: {
                    doctype: 'huibao',
                    wendangid: '',
                    nigaouserid: '',
                    zhuangtai: 'caogao',
                    riqi: this.getToday(),
                    gongzuoqingkuang: '',
                    biaoti: '',
                    nigaoren: '',
                    nigaodanwei: '',
                    zhiweiname: '',
                    luoshiqingkuang: '',
                    gongzuojihua: '',
                    cunzaiwenti: '',
                    yijianjianyi: '',
                    shenpihis: {},
                    liuchenglist: [],
                    qianyuelist: [],
                    fileList: [],
                    fujianList: []
                }
            };
        },
        methods: {
            getToday() {
                var date = new Date();
                var seperator1 = '-';
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = '0' + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = '0' + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            piyuejilu() {
                this.xianshi = 1 - this.xianshi;
            },
            querenyuedu() {
                API.mindocyiyue({
                    token: localStorage.getItem('token'),
                    wendangid: this.form.wendangid,
                    banli: this.banli
                }).then(({
                    data
                }) => {
                    this.form.qianyuelist = data.qianyuelist;
                    if (this.istongxinlu == 0) {
                        this.$message.success({
                            showClose: true,
                            message: '审批成功！',
                            duration: 2000
                        });
                    }
                    this.yuedu = 0;
                });
            },
            getImgUrl(imageurl) {
                return API.base + '/data/' + imageurl;
            },
            querensend() {
                this.istongxinlu = 1;
            },
            guanbi(e) {
                if (e == 0) {
                    localStorage.setItem('shuaxin', 0);
                    this.$router.go(-1);
                } else {
                    this.istongxinlu = 0;
                }
            },
            querenfasong(e) {
                if (e && this.toData.length == 0) {
                    this.$message({
                        showClose: true,
                        message: '请选择发送人',
                        duration: 2000
                    });
                    return '';
                }
                this.loading = true;
                var fasongdata = {
                    toData: this.toData,
                    mindoc: this.form,
                    token: localStorage.getItem('token')
                };
                if (!e) fasongdata.toData = [];
                API.fasongmindoc(fasongdata).then(({
                    data
                }) => {
                    this.loading = false;
                    if (data.MSG == 'YES') {
                        this.$message.success({
                            showClose: true,
                            message: e == 1 ? '发送成功' : '保存成功',
                            duration: 2000
                        });
                        this.tongzhi = 0;
                        if (e) {
                            localStorage.setItem('shuaxin', 0);
                            this.$router.go(-1);
                        }
                    } else {
                        this.$message({
                            message: '参数错误，请刷新后重试'
                        });
                    }
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

<style lang="scss">
    .huibaohuibao {
        text-align: center;
        padding-bottom: 100px;
    }
    .dayin {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .renyuan {
        text-align: center;
        .tongxinlu {
            margin-left: 25%;
        }
    }
    .huibao {
        margin-left: 10%;
        width: 80%;
        color: #ff0000;
        .bantou {
            display: flex;
            justify-content: center;
            padding-top: 50px;
            font-size: 35px;
            text-align: center;
        }
        .riqi {
            margin-top: 20px;
            display: flex;
            line-height: 50px;
            justify-content: space-between;
        }
        .kuang {
            border: 2px solid red;
            .kuang1 {
                min-height: 50px;
                line-height: 50px;
                border-bottom: 2px solid red;
                display: flex;
                .kuang11 {
                    width: 20%;
                    border-right: 2px solid red;
                }
                .kuang12 {
                    width: 80%;
                    text-align: center;
                    .qianming {
                        height: 50px;
                        width: 100px;
                    }
                }
                .neirong {
                    width: 80%;
                }
            }
            .fujian {
                min-height: 50px;
                line-height: 50px;
                display: flex;
                .fujian1 {
                    width: 20%;
                    height: 100%;
                }
                .fujian2 {
                    min-height: 50px;
                    width: 80%;
                    border-left: 2px solid red;
                }
            }
        }
    }
    .upload {
        margin-left: 35%;
        width: 30%;
    }
</style>
