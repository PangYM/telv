import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Main from '@/components/Main';

// 个人事务
import Fasongyoujian from '@/components/person/Fasongyoujian';
import Yifayoujian from '@/components/person/Yifayoujian';
import Yishouyoujian from '@/components/person/Yishouyoujian';
import Caogaoxiang from '@/components/person/Caogaoxiang';
import Tongxinlu from '@/components/person/Tongxinlu';

//公文发文
import Yangban from '@/components/fawen/Yangban';
import Gongwen from '@/components/fawen/Gongwen';
import Fawen from '@/components/fawen/Fawen';
import Huiyi from '@/components/fawen/Huiyi';
import Dangwu from '@/components/fawen/Dangwu';
import Dangwuhuiyi from '@/components/fawen/Dangwuhuiyi';
import Qianbao from '@/components/fawen/Qianbao';
import Yian from '@/components/fawen/Yian';
import Daibanfawen from '@/components/fawen/Daibanfawen';
import Fawenguanli from '@/components/fawen/Fawenguanli';
import Fawencaogao from '@/components/fawen/Fawencaogao';
import Wodefawen from '@/components/fawen/Wodefawen';

//公文收文
import Shouwendengji from '@/components/shouwen/Shouwendengji';
import Daibanshouwen from '@/components/shouwen/Daibanshouwen';
import Shouwenguanli from '@/components/shouwen/Shouwenguanli';
import Shouwencaogao from '@/components/shouwen/Shouwencaogao';
import Yifashouwen from '@/components/shouwen/Yifashouwen';

//办公管理
import Gonggaoguanli from '@/components/bangongguanli/Gonggaoguanli';
import Gonggao from '@/components/bangongguanli/Gonggao';
import Huiyiguanli from '@/components/bangongguanli/Huiyiguanli';
import Huiyifaqi from '@/components/bangongguanli/Huiyifaqi';
import Duban from '@/components/bangongguanli/Duban';
import Dubanguanli from '@/components/bangongguanli/Dubanguanli';
import Bumenwenjian from '@/components/bangongguanli/Bumenwenjian';
import Yujingguanli from '@/components/bangongguanli/Yujingguanli';
import Yujing from '@/components/bangongguanli/Yujing';

//系统管理
import UserChangePwd from '@/components/xitongguanli/changepwd';
import UserProfile from '@/components/xitongguanli/profile';
import UserTouxiang from '@/components/xitongguanli/touxiang';
import UserQianming from '@/components/xitongguanli/qianming';
import Userguanli from '@/components/xitongguanli/userguanli';

import Drage from '@/components/Drage'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve);

Vue.use(Router);

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/D3',
      name: 'D3',
      component: Drage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bangongguanli/gonggao',
      component: Gonggao,
      name: '公告发起',
      menuShow: false,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bangongguanli/duban',
      component: Duban,
      name: '督办',
      menuShow: false,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bangongguanli/huiyifaqi',
      component: Huiyifaqi,
      name: '会议发起',
      menuShow: false,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bangongguanli/yujing',
      component: Yujing,
      name: '新增预警',
      menuShow: false,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fawen/gongwen',
      name: '公文印发单',
      component: Gongwen
    },
    {
      path: '/fawen/fawen',
      name: '发文',
      component: Fawen
    },
    {
      path: '/fawen/huiyi',
      name: '会议发文',
      component: Huiyi
    },
    {
      path: '/fawen/dangwu',
      name: '党务发文',
      component: Dangwu
    },
    {
      path: '/fawen/dangwuhuiyi',
      name: '党务会议发文',
      component: Dangwuhuiyi
    },
    {
      path: '/fawen/qianbao',
      name: '签报',
      component: Qianbao
    },
    {
      path: '/fawen/yian',
      name: '议案报告',
      component: Yian
    },
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/main',
      menuShow: true,
      iconCls: 'iconfont icon-component', 
      leaf: true,
      children: [
        {
          path: '/main',
          name: '首页',
          component: Main,
          meta: {
            requiresAuth: true
          }
        },]
    },
    {
      path: '/',
      name: '个人事务',
      component: Home,
      redirect: '/main',
      menuShow: true,
      iconCls: 'iconfont icon-component', 
      children: [
        {
          path: '/person/fasongyoujian',
          component: Fasongyoujian,
          name: '发送邮件',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/person/yishouyoujian',
          component: Yishouyoujian,
          name: '已收邮件',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/person/yifayoujian',
          component: Yifayoujian,
          name: '已发邮件',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/person/caogaoxiang',
          component: Caogaoxiang,
          name: '草稿箱',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/person/tongxinlu',
          component: Tongxinlu,
          name: '通讯录',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '公文发文',
      menuShow: true,
      iconCls: 'iconfont icon-survey1', 
      children: [
        {
          path: '/fawen/Yangban',
          name: '发文样版',
          component: Yangban,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/fawen/daibanfawen',
          component: Daibanfawen,
          name: '待办发文',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/fawen/Fawenguanli',
          component: Fawenguanli,
          name: '发文管理',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/fawen/Fawencaogao',
          component: Fawencaogao,
          name: '发文草稿',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/fawen/wodefawen',
          component: Wodefawen,
          name: '我的发文',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '公文收文',
      menuShow: true,
      iconCls: 'iconfont icon-survey1', 
      children: [
        {
          path: '/shouwen/shouwendengji',
          component: Shouwendengji,
          name: '收文登记',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shouwen/daibanshouwen',
          component: Daibanshouwen,
          name: '待办收文',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shouwen/shouwenguanli',
          component: Shouwenguanli,
          name: '收文管理',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shouwen/shouwencaogao',
          component: Shouwencaogao,
          name: '收文草稿',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shouwen/yifashouwen',
          component: Yifashouwen,
          name: '已发收文',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '办公管理',
      menuShow: true,
      iconCls: 'iconfont icon-electronics',
      children: [
        {
          path: '/bangongguanli/gonggaoguanli',
          component: Gonggaoguanli,
          name: '公告管理',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/bangongguanli/dubanguanli',
          component: Dubanguanli,
          name: '督办管理',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/bangongguanli/huiyiguanli',
          component: Huiyiguanli,
          name: '会议管理',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/bangongguanli/bumenwenjian',
          component: Bumenwenjian,
          name: '部门文件',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/bangongguanli/yujingguanli',
          component: Yujingguanli,
          name: '预警管理',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '系统管理',
      menuShow: true,
      iconCls: 'iconfont icon-set', 
      children: [
        {
          path: '/xitongguanli/profile',
          component: UserProfile,
          name: '我的信息',
          menuShow: false,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/xitongguanli/touxiang',
          component: UserTouxiang,
          name: '我的头像',
          menuShow: false,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/xitongguanli/qianming',
          component: UserQianming,
          name: '我的签名',
          menuShow: false,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/xitongguanli/changepwd',
          component: UserChangePwd,
          name: '修改密码',
          menuShow: false,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/xitongguanli/userguanli',
          component: Userguanli,
          name: '人员管理',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/xitongguanli/bumenguanli',
          component: Dashboard,
          name: '部门管理',
          menuShow: true,
          meta: {
            requiresAuth: true
          }
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = localStorage.getItem('token');
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  }else{
    next();//如果无需token,那么随它去吧
  }
});


export default router;
