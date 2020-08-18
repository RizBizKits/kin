import Vue from 'vue'
import App from './App.vue'
import router from './routes/index'
import { sync } from 'vuex-router-sync'
import './plugins/element.js'
import store from "@/store/store"

import moment from 'moment'

Vue.prototype.moment = moment;

Vue.config.productionTip = false;
sync(store,router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');