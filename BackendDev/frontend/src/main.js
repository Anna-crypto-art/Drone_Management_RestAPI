import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import router from './routers'

Vue.config.productionTip = false


new Vue({
   render: h => h(App),
 })
 .use(router)
 .$mount('#app')
