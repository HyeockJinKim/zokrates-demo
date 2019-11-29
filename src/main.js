import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import { store } from './store/store'

Vue.use(Vuex)

import VueHighlightJS from 'vue-highlight.js';

// Highlight.js languages (All languages)
import 'vue-highlight.js/lib/allLanguages'

/*
* Import Highlight.js theme
* Find more: https://highlightjs.org/static/demo/
*/
import 'highlight.js/styles/default.css';

/*
* Use Vue Highlight.js
*/
Vue.use(VueHighlightJS);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
