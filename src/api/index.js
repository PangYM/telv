import axios from 'axios';

//设置全局axios默认值
axios.defaults.timeout = 5000; //5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;

//request拦截器
instance.interceptors.request.use(
    config => {
        //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
        if (localStorage.getItem('token')) {
            config.headers.Authorization = `token ${localStorage.getItem('token')}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
//respone拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('token'); //可能是token过期，清除它
                    router.replace({ //跳转到登录页面
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
            }
        }
        return Promise.reject(error.response);
    }
);

//基地址
export const base = 'http://10.190.177.115';
// export const base = 'http://localhost';
// export const base = 'http://192.168.199.207';
export const port = ':16888/api/';
export const baseurl = base + port;
//用户登录
function userLogin(data) {
    return instance.post(baseurl + 'userLogin', data);
}
//获取用户
function getUser(data) {
    return instance.post(baseurl + 'getUser', data);
}
//修改我的信息
function setUserProfile(data) {
    return instance.post(baseurl + 'setUserProfile', data);
}
//获取用户头像
function gettouxiangUrl(data) {
    return instance.post(baseurl + 'gettouxiangUrl', data);
}
//获取用户头像
function settouxiangUrl(data) {
    return instance.post(baseurl + 'settouxiangUrl', data);
}
//获取用户签名
function getqianmingUrl(data) {
    return instance.post(baseurl + 'getqianmingUrl', data);
}
//设置用户签名
function setqianmingUrl(data) {
    return instance.post(baseurl + 'setqianmingUrl', data);
}
//修改密码
function changepwd(data) {
    return instance.post(baseurl + 'changepwd', data);
}
//获取发文号
function getfawenhao(data) {
    return instance.post(baseurl + 'getfawenhao', data);
}
//获取个人发文草稿
function getfawencaogao(data) {
    return instance.post(baseurl + 'getfawencaogao', data);
}
//删除发文草稿
function deletefawencaogao(data) {
    return instance.post(baseurl + 'deletefawencaogao', data);
}
//获取通信录
function gettongxinlu(data) {
    return instance.post(baseurl + 'gettongxinlu', data);
}
//发送文档
function fasongwendang(data) {
    return instance.post(baseurl + 'fasongwendang', data);
}
//获取待办发文管理
function getdaibanfawen(data) {
    return instance.post(baseurl + 'getdaibanfawen', data);
}
//获取个人发文管理
function getfawenguanli(data) {
    return instance.post(baseurl + 'getfawenguanli', data);
}
//退文
function tuiwen(data) {
    return instance.post(baseurl + 'tuiwen', data);
}
//批示
function pishi(data) {
    return instance.post(baseurl + 'pishi', data);
}
//已阅
function yiyue(data) {
    return instance.post(baseurl + 'yiyue', data);
}
//获取个人收文管理
function getshouwenguanli(data) {
    return instance.post(baseurl + 'getshouwenguanli', data);
}
//根据编号获取文档
function getwendangid(data) {
    return instance.post(baseurl + 'getwendangid', data);
}
//发送mindoc
function fasongmindoc(data) {
    return instance.post(baseurl + 'fasongmindoc', data);
}
//保存image
function baocunimage(data) {
    return instance.post(baseurl + 'baocunimage', data);
}
//获取个人发文草稿
function getmindoccaogao(data) {
    return instance.post(baseurl + 'getmindoccaogao', data);
}
//删除发文草稿
function deletemindoccaogao(data) {
    return instance.post(baseurl + 'deletemindoccaogao', data);
}
//根据编号获取mindoc
function getmindocid(data) {
    return instance.post(baseurl + 'getmindocid', data);
}
//获取个人发送管理
function getfasongguanli(data) {
    return instance.post(baseurl + 'getfasongguanli', data);
}
//获取接受管理
function getjieshouguanli(data) {
    return instance.post(baseurl + 'getjieshouguanli', data);
}
//获取用户信息
function getusers(data) {
    return instance.post(baseurl + 'getusers', data);
}
//完成min文档
function wanchengmindoc(data) {
    return instance.post(baseurl + 'wanchengmindoc', data);
}
//min文档已阅
function mindocyiyue(data) {
    return instance.post(baseurl + 'mindocyiyue', data);
}
//公告管理
function getgonggaoguanli(data) {
    return instance.post(baseurl + 'getgonggaoguanli', data);
}
//获取首页未读
function getshouyeweidu(data) {
    return instance.post(baseurl + 'getshouyeweidu', data);
}
//新建文件夹
function xinjianwenjianjia(data) {
    return instance.post(baseurl + 'xinjianwenjianjia', data);
}
//获取文件夹
function huoqubumenwenjian(data) {
    return instance.post(baseurl + 'huoqubumenwenjian', data);
}
//获取部门文件
function huoqubumenwenjian(data) {
    return instance.post(baseurl + 'huoqubumenwenjian', data);
}
//文件删除
function wenjianshanchu(data) {
    return instance.post(baseurl + 'wenjianshanchu', data);
}
//新加常用组
function setchangyongzu(data) {
    return instance.post(baseurl + 'setchangyongzu', data);
}
//获取常用组
function getchangyongzu(data) {
    return instance.post(baseurl + 'getchangyongzu', data);
}
//修改常用组
function xiugaichangyongzu(data) {
    return instance.post(baseurl + 'xiugaichangyongzu', data);
}
//删除人员
function shanchurenyuan(data) {
    return instance.post(baseurl + 'shanchurenyuan', data);
}
//新建部门
function xinjianbumen(data) {
    return instance.post(baseurl + 'xinjianbumen', data);
}
//新增人员
function xinzengrenyuan(data) {
    return instance.post(baseurl + 'xinzengrenyuan', data);
}
//是否在线
function getifzaixian(data) {
    return instance.post(baseurl + 'getifzaixian', data);
}
//查询文档
function chaxunwendang(data) {
    return instance.post(baseurl + 'chaxunwendang', data);
}
//删除文档
function shanchuwendang(data) {
    return instance.post(baseurl + 'shanchuwendang', data);
}
//获取首页图片
function gettoubanimageslist(data) {
    return instance.post(baseurl + 'gettoubanimageslist', data);
}
//获取友情链接
function getyouqinglist(data) {
    return instance.post(baseurl + 'getyouqinglist', data);
}
//设置友情链接
function setyouqinglist(data) {
    return instance.post(baseurl + 'setyouqinglist', data);
}
//获取登录页介绍
function getdengluyelist(data) {
    return instance.post(baseurl + 'getdengluyelist', data);
}
//设置登录页介绍
function setdengluyelist(data) {
    return instance.post(baseurl + 'setdengluyelist', data);
}
//获取轮播图
function getlunbotulist(data) {
    return instance.post(baseurl + 'getlunbotulist', data);
}
//设置轮播图
function setlunbotulist(data) {
    return instance.post(baseurl + 'setlunbotulist', data);
}
//返回上一级
function fanhui(data) {
    return instance.post(baseurl + 'fanhui', data);
}
//撤回
function chehui(data) {
    return instance.post(baseurl + 'chehui', data);
}
//通知董芸
function tongzhidongyun(data) {
    return instance.post(baseurl + 'tongzhidongyun', data);
}
//通知收文督办
function getshouwenduban(data) {
    return instance.post(baseurl + 'getshouwenduban', data);
}
//通知收文督办
function shanchuyoujian(data) {
    return instance.post(baseurl + 'shanchuyoujian', data);
}
export {
    shanchuyoujian,
    getshouwenduban,
    tongzhidongyun,
    chehui,
    fanhui,
    setlunbotulist,
    getlunbotulist,
    setdengluyelist,
    getdengluyelist,
    setyouqinglist,
    getyouqinglist,
    gettoubanimageslist,
    shanchuwendang,
    chaxunwendang,
    getifzaixian,
    xinzengrenyuan,
    xinjianbumen,
    shanchurenyuan,
    xiugaichangyongzu,
    getchangyongzu,
    setchangyongzu,
    wenjianshanchu,
    huoqubumenwenjian,
    xinjianwenjianjia,
    getshouyeweidu,
    getgonggaoguanli,
    mindocyiyue,
    wanchengmindoc,
    getusers,
    getfasongguanli,
    getjieshouguanli,
    getmindocid,
    fasongmindoc,
    baocunimage,
    getmindoccaogao,
    deletemindoccaogao,
    userLogin,
    getUser,
    setUserProfile,
    gettouxiangUrl,
    settouxiangUrl,
    getqianmingUrl,
    setqianmingUrl,
    changepwd,
    getfawenhao,
    getfawencaogao,
    deletefawencaogao,
    gettongxinlu,
    fasongwendang,
    getdaibanfawen,
    getfawenguanli,
    tuiwen,
    pishi,
    yiyue,
    getshouwenguanli,
    getwendangid,
}