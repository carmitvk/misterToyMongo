import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/store.js'

import VueCharts from 'vue-chartjs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBu9npA0Lw1keGT1kTG9zxupfpXgeV4DTA',
    // const API_KEY = 'AIzaSyBu9npA0Lw1keGT1kTG9zxupfpXgeV4DTA';
    libraries: 'places',
  },
})

// import './assets/style/main.css'

// import './assets/scss/main.scss';
import './assets/scss/main.scss'
//npm i node-sass
//npm i sass-loader@10.1.1

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')

