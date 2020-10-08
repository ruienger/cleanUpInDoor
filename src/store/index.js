import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 导入customer的index.js
import customer from './customer/index'
import comment from './comment/index'
import product from './product/index'
import order from './order/index'
import category from './category/index'
import waiter from './waiter/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // customer模块
    customer,
    comment,
    product,
    order,
    category,
    waiter
  },
  getters
})

export default store
