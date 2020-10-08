// 在Vuex中 需要处理网路请求 我们就需要导入axios
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/http/axios'
import { Message } from 'element-ui'

// import { data } from 'autoprefixer'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  state: {
    products: [

    ],
    product: '',
    total: null
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_TOTAL(state, total) {
      state.total = total
    },
    SET_PRODUCT(state, product) {
      state.product = product
    }
  },
  actions: {
    findAll({ commit }) {
      axios.get('/product/findAll').then((result) => {
        commit('SET_PRODUCTS', result.data)
      }).catch((err) => {
        alert(err)
      })
    },
    queryProduct({ commit }, data) {
      axios.post('/product/queryProductCascadeCategory', data).then((result) => {
        commit('SET_PRODUCTS', result.data.list)
        commit('SET_TOTAL', result.data.total)
      }).catch((err) => {
        alert(err)
      })
    },
    saveOrUpdate({ dispatch }, data) {
      axios.post('/product/saveOrUpdate', data.form).then((result) => {
        alert(result.message)
        dispatch('queryProduct', data.list)
      }).catch((err) => {
        alert(err)
      })
    },
    deleteById({ dispatch }, data) {
      axios.get('/product/deleteById?id=' + data.id).then((result) => {
        dispatch('queryProduct', data.list)
        Message({
          type: 'success',
          message: result.data.message
        })
      }).catch((err) => {
        alert(err)
      })
    },
    findProductById({ commit }, id) {
      axios.get('/product/findProductById?id=' + id).then((result) => {
        commit('SET_PRODUCT', result.data)
      }).catch((err) => {
        alert(err)
      })
    },
    findByCategory({ commit }, id) {
      axios.get('/product/findByCategoryId?id=' + id).then((result) => {
        console.log(result.data)
        commit('SET_PRODUCTS', result.data)
      }).catch((err) => {
        alert(err)
      })
    },
    toDelHandler({ commit }, ids) {
      axios.post('/product/batchDelete', ids).then((result) => {
        commit('SET_PRODUCTS', result.data)
      }).catch((err) => {
        alert(err)
      })
    }
  }
}
