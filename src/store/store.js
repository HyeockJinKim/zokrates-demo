import Vue from 'vue'
import Vuex from 'vuex'
import zok from './module/zokrates'
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        zok,
    },
});