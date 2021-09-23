import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueMaterial from 'vue-material'
import { MdApp,MdButton, MdList , MdField, MdCheckbox, MdProgress, MdMenu, MdToolbar, MdSnackbar} from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './assets/sass/pages/home.scss'
Vue.config.productionTip = false
Vue.use(MdApp);
Vue.use(MdList);
Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdCheckbox);
Vue.use(MdProgress);
Vue.use(MdMenu);
Vue.use(MdToolbar);
Vue.use(MdSnackbar);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
