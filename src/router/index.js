import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Main from '@/components/Main';

// 电子邮件
import Fasongyoujian from '@/components/youjian/Fasongyoujian';
import Yifayoujian from '@/components/youjian/Yifayoujian';
import Yishouyoujian from '@/components/youjian/Yishouyoujian';
import Caogaoxiang from '@/components/youjian/Caogaoxiang';

//公文发文
import Gaozhi from '@/components/fawen/Gaozhi';
import Gongwen from '@/components/fawen/Gongwen';
import Fawen from '@/components/fawen/Fawen';
import Huiyi from '@/components/fawen/Huiyi';
import Dangwu from '@/components/fawen/Dangwu';
import Dangwuhuiyi from '@/components/fawen/Dangwuhuiyi';
import Qianbao from '@/components/fawen/Qianbao';
import Yian from '@/components/fawen/Yian';
import Gouzhi from '@/components/fawen/Gouzhi';
import Daibanfawen from '@/components/fawen/Daibanfawen';
import Fawenduban from '@/components/fawen/Fawenduban';
import Fawenguanli from '@/components/fawen/Fawenguanli';
import Fawencaogao from '@/components/fawen/Fawencaogao';
import Wodefawen from '@/components/fawen/Wodefawen';

//公文收文
import Shouwendengji from '@/components/shouwen/Shouwendengji';
import Daibanshouwen from '@/components/shouwen/Daibanshouwen';
import Shouwenduban from '@/components/shouwen/Shouwenduban';
import Shouwenguanli from '@/components/shouwen/Shouwenguanli';
import Shouwencaogao from '@/components/shouwen/Shouwencaogao';
import Yifashouwen from '@/components/shouwen/Yifashouwen';

//办公管理
import Gonggaoguanli from '@/components/bangongguanli/Gonggaoguanli';
import Gonggao from '@/components/bangongguanli/Gonggao';
import Huibaoguanli from '@/components/bangongguanli/Huibaoguanli';
import Huibao from '@/components/bangongguanli/Huibao';
import Huiyiguanli from '@/components/bangongguanli/Huiyiguanli';
import Huiyifaqi from '@/components/bangongguanli/Huiyifaqi';
import Duban from '@/components/bangongguanli/Duban';
import Dubanguanli from '@/components/bangongguanli/Dubanguanli';
import Bumenwenjian from '@/components/bangongguanli/Bumenwenjian';
import Tixingguanli from '@/components/bangongguanli/Tixingguanli';
import Tixing from '@/components/bangongguanli/Tixing';
import Tongxinlu from '@/components/bangongguanli/Tongxinlu';
import Changyongzu from '@/components/bangongguanli/Changyongzu';

//系统管理
import UserChangePwd from '@/components/xitongguanli/Changepwd';
import UserProfile from '@/components/xitongguanli/Profile';
import UserTouxiang from '@/components/xitongguanli/Touxiang';
import UserQianming from '@/components/xitongguanli/Qianming';
import Renyuanguanli from '@/components/xitongguanli/Renyuanguanli';
import Wendangguanli from '@/components/xitongguanli/Wendangguanli';
import Yemianguanli from '@/components/xitongguanli/Yemianguanli';

import Showhtml from '@/components/Showhtml'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve);

Vue.use(Router);

let router = new Router({
  scrollBehavior(to, from, savedPosition) {
    try {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = localStorage.getItem('scrollTop');
      }
    } catch (error) {

    }
    try {
      if (to.meta.keepAlive) {
        document.getElementsByClassName('content-container')[0].scrollTop = to.meta.savedPosition;
      }
    } catch (error) {

    }
  },
  // mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      name: '登录',
      meta: {
        requireAuth: false,
        keepAlive: false,
      },
    },
    {
      path: '/bangongguanli/gonggao',
      component: Gonggao,
      name: '公告发起',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/bangongguanli/duban',
      component: Duban,
      name: '督办',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/bangongguanli/huibao',
      component: Huibao,
      name: '月度汇报',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/bangongguanli/huiyifaqi',
      component: Huiyifaqi,
      name: '会议发起',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/bangongguanli/tixing',
      component: Tixing,
      name: '新增提醒',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/fawen/gongwen',
      component: Gongwen,
      name: '公文印发单',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/fawen/fawen',
      component: Fawen,
      name: '发文',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/fawen/huiyi',
      component: Huiyi,
      name: '会议发文',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/fawen/dangwu',
      component: Dangwu,
      name: '党务发文',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/fawen/dangwuhuiyi',
      component: Dangwuhuiyi,
      name: '党务会议发文',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/fawen/qianbao',
      component: Qianbao,
      name: '签报',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/fawen/yian',
      component: Yian,
      name: '议案报告',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/fawen/gouzhi',
      component: Gouzhi,
      name: '购置申请',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
    },
    {
      path: '/',
      component: Home,
      name: '首页',
      redirect: '/main',
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
      children: [
        {
          path: '/main',
          component: Main,
          name: '首页',
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/showhtml',
          component: Showhtml,
          name: 'showhtml',
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
      ]
    },
    {
      path: '/youjian',
      name: '电子邮件',
      component: Home,
      redirect: '/main',
      menuShow: true,
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
      children: [
        {
          path: '/youjian/fasongyoujian',
          component: Fasongyoujian,
          name: '发送邮件',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/youjian/yishouyoujian',
          component: Yishouyoujian,
          name: '已收邮件',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/youjian/yifayoujian',
          component: Yifayoujian,
          name: '已发邮件',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/youjian/caogaoxiang',
          component: Caogaoxiang,
          name: '草稿箱',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
      ]
    },
    {
      path: '/fawen',
      component: Home,
      name: '公文发文',
      menuShow: true,
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
      children: [
        {
          path: '/fawen/gaozhi',
          name: '发文稿纸',
          component: Gaozhi,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/fawen/daibanfawen',
          component: Daibanfawen,
          name: '待办发文',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/fawen/Fawenduban',
          component: Fawenduban,
          name: '发文督办',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/fawen/Fawenguanli',
          component: Fawenguanli,
          name: '发文管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/fawen/Fawencaogao',
          component: Fawencaogao,
          name: '发文草稿',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/fawen/wodefawen',
          component: Wodefawen,
          name: '我的发文',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
      ]
    },
    {
      path: '/shouwen',
      component: Home,
      name: '公文收文',
      menuShow: true,
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
      children: [
        {
          path: '/shouwen/shouwendengji',
          component: Shouwendengji,
          name: '收文登记',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/shouwen/daibanshouwen',
          component: Daibanshouwen,
          name: '待办收文',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/shouwen/shouwenduban',
          component: Shouwenduban,
          name: '收文督办',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/shouwen/shouwenguanli',
          component: Shouwenguanli,
          name: '收文管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/shouwen/shouwencaogao',
          component: Shouwencaogao,
          name: '收文草稿',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/shouwen/yifashouwen',
          component: Yifashouwen,
          name: '已发收文',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
      ]
    },
    {
      path: '/bangong',
      component: Home,
      name: '办公管理',
      menuShow: true,
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
      children: [
        {
          path: '/bangongguanli/gonggaoguanli',
          component: Gonggaoguanli,
          name: '公告管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/bangongguanli/dubanguanli',
          component: Dubanguanli,
          name: '督办管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/bangongguanli/huibaoguanli',
          component: Huibaoguanli,
          name: '汇报管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/bangongguanli/huiyiguanli',
          component: Huiyiguanli,
          name: '会议管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/bangongguanli/bumenwenjian',
          component: Bumenwenjian,
          name: '部门文件',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/bangongguanli/tixingguanli',
          component: Tixingguanli,
          name: '提醒管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/bangongguanli/tongxinlu',
          component: Tongxinlu,
          name: '通讯录',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/bangongguanli/changyongzu',
          component: Changyongzu,
          name: '常用组',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
      ]
    },
    {
      path: '/xitong',
      component: Home,
      name: '系统管理',
      menuShow: true,
      meta: {
        requireAuth: true,
        keepAlive: false,
      },
      children: [
        {
          path: '/xitongguanli/profile',
          component: UserProfile,
          name: '我的信息',
          menuShow: false,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/xitongguanli/touxiang',
          component: UserTouxiang,
          name: '我的头像',
          menuShow: false,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/xitongguanli/qianming',
          component: UserQianming,
          name: '我的签名',
          menuShow: false,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/xitongguanli/changepwd',
          component: UserChangePwd,
          name: '修改密码',
          menuShow: false,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/xitongguanli/renyuanguanli',
          component: Renyuanguanli,
          name: '人员管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
        {
          path: '/xitongguanli/wendangguanli',
          component: Wendangguanli,
          name: '文档管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: true,
          }
        },
        {
          path: '/xitongguanli/yemianguanli',
          component: Yemianguanli,
          name: '页面管理',
          menuShow: true,
          meta: {
            requireAuth: true,
            keepAlive: false,
          },
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
  // 获取store里面的token
  // let token = localStorage.getItem('token');
  // if (token) {
  //   next();
  // } else {
  //   next({
  //     path: '/login',
  //     query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
  //   });
  // }
});


export default router;
