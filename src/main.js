// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import fullCalendar from 'vue-fullcalendar';
import VueParticles from 'vue-particles';
import Print from 'vue-print-nb';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = true;
Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.component('full-calendar', fullCalendar);
Vue.use(Print);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {
  }
});
