/**
 * Created by Jeffrey on 2017/12/30.
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  // state 声明需要用到的状态并赋予初始值 -> 使用：this.$store.state.**
  state:{
    views: localStorage["showreelViews"] ? JSON.parse(localStorage["showreelViews"]) : 500,
    curKsfpIndex: 0,
    clientWidth: 0,
    clientHeight: 0,
    isAudioBtnHide: false
  },
  // getters 由state派生出新的状态并通过方法返回值，第一个参数为state -> 使用：this.$store.getters.**
  getters:{
    towBoxHeight(state){
      return state.clientWidth*0.3488;
    },
    twoPdfWidth(state){
      return state.clientWidth*0.4774-60;
    },
    twoPdfFsWidth(state){
      return state.clientWidth*0.85-60;
    },
    twoVideoWidth(state){
      return state.clientWidth*0.4774-40;
    },
    twoVideoFsWidth(state){
      return state.clientWidth*0.85-50;
    }
  },
  // mutations 声明需要用到的方法，第一个参数为state -> 使用：this.$store.commit('**'[, 传参])
  mutations:{
    addViews(state){
      state.views++;
      localStorage.setItem("showreelViews", JSON.stringify(state.views));
    },
    changeKsfpIndex(state, data){
      state.curKsfpIndex = data;
    },
    getClientWidth(state, data){
      state.clientWidth = data;
    },
    getClientHeight(state, data){
      state.clientHeight = data;
    },
    changeAudioBtnHide(state){
      state.isAudioBtnHide = !state.isAudioBtnHide;
    }
  },
  // actions 声明调用mutations里的函数的方法（可异步），第一参数为context -> 使用：this.$store.dispatch('**'[, 传参])
  actions:{

  },
  // modules 包含多个子模块 -> 使用：this.$store.state.**.**
  modules: {
    // moduleA: {
    //   state: { ... },
    //   mutations: { ... },
    //   actions: { ... },
    //   getters: { ... }
    // },
    // moduleB: {
    //   state: { ... },
    //   mutations: { ... },
    //   actions: { ... },
    //   getters: { ... }
    // }
  }
})

export default store
