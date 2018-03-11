# showreel
大学作品集

* 作品展示：https://zhangfuyuan.github.io/showreel/
> * 注意：具体作品目前无法在github上通畅展示，可能原因作品大小较大，远在美国的服务器传送数据较慢！！！

## 参考资料（非公开）


[element ui](http://element-cn.eleme.io/#/zh-CN)

[ks-vue-fullpage](https://npm.taobao.org/package/ks-vue-fullpage)

## 开发过程

### 1. 创建一个 `vue` 项目

  ```
    vue init webpack showreel
    cd showreel
    npm run dev
  ```

  * 注意：如果启动项目后报 `'webpack-dev-server' 不是内部或外部命令，也不是可运行的程序 或批处理文件。` 的错，则需要再安装一下依赖包：
    
  ```
    npm i
  ```

### 2. 下载相关依赖包/插件

  >（1）`element ui` 
  > * 下载：
  
  ```
    npm i element-ui -S
  ```
  
  > * 在 `main.js` 文件配置如下：
  
  ```
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
    Vue.use(ElementUI)
  ```
  
  >（2）`scss`
  > * 下载：
  
  ```
    npm install --save-dev sass-loader
    npm install --save-dev node-sass
  ```
  
  > * 在 `/assets` 目录下新建一个scss目录和总样式文件，内容如下：
  
  ```
    @import './reset.scss';
  ```
  
  > * 在 `main.js` 文件配置如下：
  
  ```
    import '@/assets/scss/app.scss'
  ```
  
  >（3）`vuex`
  > * 下载：
  
  ```
    npm install vuex -S
  ```
  
  > * 在 `/src` 目录下创建一个vuex目录和store.js文件，内容如下：
  
  ```
    import Vue from 'vue'
    import Vuex from 'vuex'
    
    Vue.use(Vuex);
    
    const store = new Vuex.Store({
      // state 声明需要用到的状态并赋予初始值 -> 使用：this.$store.state.**
      state:{
    
      },
      // getters 由state派生出新的状态并通过方法返回值，第一个参数为state -> 使用：this.$store.getters.**
      getters:{
    
      },
      // mutations 声明需要用到的方法，第一个参数为state -> 使用：this.$store.commit('**'[, 传参])
      mutations:{
    
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
  
  ```
  
  > * 在 `main.js` 文件配置如下：
  
  ```
    import Vuex from 'vuex'
    import store from './vuex/store'
    Vue.use(Vuex)
    
    new Vue({
      el: '#app',
      router,
      store,//注入store模块
      template: '<App/>',
      components: { App }
    })
  ```
  
  >（4）`ks-vue-fullpage`
  > * 下载：
  
  ```
    npm i --save ks-vue-fullpage
    npm install hammerjs -S
    npm install velocity-animate -S
  ```
  
  > * 在 `main.js` 文件配置如下：
  
  ```
    import KsVueFullpage from 'ks-vue-fullpage'
    Vue.use(KsVueFullpage)
  ```
  > * 在应用此插件的相关组件文件引入其还需依赖的两个包和一个样式文件，如下：
  
  ```
    <script>
      import Hammerjs from 'hammerjs'
      import VelocityAnimate from 'velocity-animate'
      import 'ks-vue-fullpage/dist/ks-vue-fullpage.min.css'
      ...
  ```

### 3. 重构项目部分目录结构和文件内容

  >（1）在 `/src` 目录下创建views目录，用于放置完整的页面；而 `/components` 目录仅放置组成页面某个部分的组件
  
  >（2）每个完整页面文件重构的内容如下：
  
  ```
    <template>
      <!--页面类别-->
      <div class="index">
        <!--各个组件-->
      </div>
    </template>
    
    <script>
    //  import { 模块名 } from '插件名'
    //  import 组件名 from '@/components/组件文件名'
    
      export default {
        name: 'index',
        data () {
          return {
            msg: ''
          }
        },
        computed: {},
        created () {},//vm实例创建完成后，可调用data和<template></template>（仅执行一次）
        mounted () {},//dom对象挂载完成后，可ajax初始化数据（仅执行一次）
        methods: {},
        props: {},
        watch: {},
        filters: {},//filterFun: value => {  return value  }  -> {{ msg | filterFun }}
        components: {
    //      组件名
        }
      }
    </script>
    
    <style lang="scss" scoped>
      @import '~@/assets/scss/const.scss';
      @import '~@/assets/scss/mixin.scss';
    
    </style>

  ```
  
  >（3）文件 `/router/index.js` 重构内容如下：
  
  ```
    import Vue from 'vue'
    import Router from 'vue-router'
    
    import Index from '@/views/index'
    import Error from '@/views/error'
    
    Vue.use(Router)
    
    export default new Router({
      routes: [
        // 根路径
        {
          path: '/',
          name: 'Index',
          redirect: '/index',
          component: Index
        },
        // 首页
        {
          path: '/index',
          name: 'Home',
          component: Index
        },
    
        // 404
        {
          path: '*',
          name: 'NotFound',
          component: Error
        }
      ]
    })
  
  ```
  
  >（4）文件 `App.vue` 重构内容如下：
  
  ```
    <template>
      <div id="app">
        <router-view/>
      </div>
    </template>
    
    <script>
      export default {
        name: 'app'
      }
    </script>
    
    <style lang="scss">
      @import '~@/assets/scss/const.scss';
      @import '~@/assets/scss/mixin.scss';
    
      body {
        //background-color: $color-bgc;
      }
    
      #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    </style>

  ```
  
  * 重构目录结构说明：
  
  ```
    ...
    
    |- src    -> 项目开发时的资源文件目录
      |- assrts  -> 项目需要用到静态资源目录
        |- fonts    -> 网站的字体资源目录
        |- images   -> 网站内需图片资源目录
        |- scss/css -> 网站样式资源目录
      |- components -> 公用的页面组件目录
      |- router  -> 页面路由配置目录
      |- views   -> 完整页面目录（可视项目规模再建各自目录）
      |- vuex    -> 状态管理模式（即多组件共享全局状态数据）的配置目录
      |- App.vue -> 应用页面，设置整体动态页面的内容、样式
      |- main.js -> 应用入口，设置所需引入的模块和基础配置
    |- static -> 网站的外需静态资源文件目录（不共同组成页面的基础架构的资源）
    
    ...
  ```

### 4. 在各组件中，根据需求逐一实现所需的功能模块......

## 问题解决

### 1. 模块/组件引入时，因名字的大小写差异引起的问题

  * 报错如下：
  
  ```
  There are multiple modules with names that only differ in casing.
  This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
  Use equal casing. Compare these module identifiers:
  * E:\web\myWorks\showreel\showreel\node_modules\Vuex\dist\vuex.esm.js
      Used by 1 module(s), i. e.
      E:\web\myWorks\showreel\showreel\node_modules\babel-loader\lib\index.js!E:\web\myWorks\showreel\showreel\src\vuex\store.js
  * E:\web\myWorks\showreel\showreel\node_modules\vuex\dist\vuex.esm.js
      Used by 1 module(s), i. e.
      E:\web\myWorks\showreel\showreel\node_modules\babel-loader\lib\index.js!E:\web\myWorks\showreel\showreel\src\main.js
  ```
    
  * 解决方法：仔细查看模块/组件引入时名字大小写是否统一，上例就是 `Vuex` 与 `vuex` 的差异导致的报错

### 2. 实时获取 `ks-vue-fullpage` 切换页面的 `index`
  
  ```
    computed: {
      curKsfpIndex(){
        return this.$ksvuefp.currentIndex;
      }
    }
  ```
  
### 3. 实现背景视差效果

  ```
    .index {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .parallax-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 120%;
        background: url(../assets/images/skyBg_banner.jpg) center no-repeat;
        background-size: cover;
        transition: transform 600ms ease;
  
        &.p1 {
          transform: translate3d(0px, -8%, 0px);
        }
        &.p2 {
          transform: translate3d(0px, -4%, 0px);
        }
        &.p3 {
          transform: translate3d(0px, 0%, 0px);
        }
      }
    }
  ```

### 4. 动态绑定多个组件优化问题

  * 原方法：
  ```
    <ksvuefp-section v-for="(section, index) in sections" :section="section" :key="index" :section-index="index">
      <!-- Use Vue-ish way for content animations and transitions. Using !$ksvuefp.slidingActive in v-show will result in content waiting for transitions between sections to finish before animating in -->
      <transition name="fade">
        <div v-show="$ksvuefp.canAnimContent(index, true)">
          <one v-if="section.key==='one'" />
          <two v-if="section.key==='two'" />
          <three v-if="section.key==='three'" />
        </div>
      </transition>
    </ksvuefp-section>
    
  ...
    
    //...
    components: {
      One,
      Two,
      Three
    }
  ```
  
  * 优化：
  ```
    <ksvuefp-section v-for="(section, index) in sections" :section="section" :key="index" :section-index="index">
      <!-- Use Vue-ish way for content animations and transitions. Using !$ksvuefp.slidingActive in v-show will result in content waiting for transitions between sections to finish before animating in -->
      <transition name="fade">
        <div v-show="$ksvuefp.canAnimContent(index, true)">
          <component :is="section.key"></component>
        </div>
      </transition>
    </ksvuefp-section>
  ...
  
    //...
    components: {
      'one': One,
      'two': Two,
      'three': Three
    }
  ```

### 5. `vue` 自带的过渡 和 动画

  >（1）最简单的例子
  > * `template` ：
  
  ```
    <div id="demo">
      <button v-on:click="show = !show">
        Toggle
      </button>
      <transition name="fade"><!-- name的值对应style里的最前缀，可自定义名 -->
        <p v-if="show">hello</p>
      </transition>
    </div>
  ```
  
  > * `script` ：
  
  ```
    new Vue({
      el: '#demo',
      data: {
        show: true
      }
    })
  ```
  
  > * `style` ：
  
  ```
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  ```
  
  > * 过渡类名可设置：
  
  ```
    在进入/离开的过渡中，会有 6 个 class 切换。
      v-enter：定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
      v-enter-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
      v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入一帧后生效 (与此同时 v-enter 被删除)，在 transition/animation 完成之后移除。
      v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
      v-leave-active：定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
      v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发一帧后生效 (与此同时 v-leave 被删除)，在 transition/animation 完成之后移除。
  ```
  
  > * 过渡动画：
  
  ```
    .fade-enter-active {
      animation: fade-in .5s;
    }
    .fade-leave-active {
      animation: fade-in .5s reverse;
    }
    @keyframes fade-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
  ```
  
  >（2）结合 `animate.css` 重置过渡类名
  > * `template` ：
  
  ```
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
  
    <div id="example-3">
      <button @click="show = !show">
        Toggle render
      </button>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
      >
        <p v-if="show">hello</p>
      </transition>
    </div>
  ```
  
  > * `script` ：
  ```
    new Vue({
      el: '#example-3',
      data: {
        show: true
      }
    })
  ```
  
  > * 嵌套过渡组件，设置不同的过渡时间：
  
  ```
    <transition :duration="{ enter: 500, leave: 800 }">...</transition>
  ```
  
  > * 在过渡组件增加监听钩子：
  ```
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
    
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <!-- ... -->
    </transition>
    
  ...
    
    // ...
    methods: {
      // --------
      // 进入中
      // --------
    
      beforeEnter: function (el) {
        // ...
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter: function (el, done) {
        // ...
        done()//必须！
      },
      afterEnter: function (el) {
        // ...
      },
      enterCancelled: function (el) {
        // ...
      },
    
      // --------
      // 离开时
      // --------
    
      beforeLeave: function (el) {
        // ...
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      leave: function (el, done) {
        // ...
        done()//必须！
      },
      afterLeave: function (el) {
        // ...
      },
      // leaveCancelled 只用于 v-show 中
      leaveCancelled: function (el) {
        // ...
      }
    }
  ```
  
  >（3）结合 `Velocity.js` 插件，设置特定过渡时期控制元素的变化
  > * `tempalte` ：
  
  ```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
    
    <div id="example-4">
      <button @click="show = !show">
        Toggle
      </button>
      <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
        v-bind:css="false"
      >
        <p v-if="show">
          Demo
        </p>
      </transition>
    </div>
  ```
  
  > * `script` ：
  
  ```
    new Vue({
      el: '#example-4',
      data: {
        show: false
      },
      methods: {
        beforeEnter: function (el) {
          el.style.opacity = 0
          el.style.transformOrigin = 'left'
        },
        enter: function (el, done) {
          Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
          Velocity(el, { fontSize: '1em' }, { complete: done })
        },
        leave: function (el, done) {
          Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
          Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
          Velocity(el, {
            rotateZ: '45deg',
            translateY: '30px',
            translateX: '30px',
            opacity: 0
          }, { complete: done })
        }
      }
    })
  ```
  
  >（4）当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。
  
  >（5）使用多个 v-if 的多个元素的过渡可以重写为绑定了动态属性的单个元素过渡：
  
  ```
    <transition>
      <button v-if="docState === 'saved'" key="saved">
        Edit
      </button>
      <button v-if="docState === 'edited'" key="edited">
        Save
      </button>
      <button v-if="docState === 'editing'" key="editing">
        Cancel
      </button>
    </transition>
  ```
  
  > * 优化：
  
  ```
    <transition>
      <button v-bind:key="docState">
        {{ buttonMessage }}
      </button>
    </transition>
    
  ...
    
    // ...
    computed: {
      buttonMessage: function () {
        switch (this.docState) {
          case 'saved': return 'Edit'
          case 'edited': return 'Save'
          case 'editing': return 'Cancel'
        }
      }
    }
  ```
  
  >（6）使用 `mode="out-in"` 或 `mode="in-out"` 避免两个元素在同一个位置上各自过渡的同时触发
  
  >（7）列表的排序过渡使用 `<transition-group>`
  
  >（8）使用 `tween.js` 封装一个过渡动画组件
  ```
    <script src="https://cdn.jsdelivr.net/npm/tween.js@16.3.4"></script>
    
    <div id="example-8">
      <input v-model.number="firstNumber" type="number" step="20"> +
      <input v-model.number="secondNumber" type="number" step="20"> =
      {{ result }}
      <p>
        <animated-integer v-bind:value="firstNumber"></animated-integer> +
        <animated-integer v-bind:value="secondNumber"></animated-integer> =
        <animated-integer v-bind:value="result"></animated-integer>
      </p>
    </div>
    
  ...
  
    Vue.component('animated-integer', {
      template: '<span>{{ tweeningValue }}</span>',
      props: {
        value: {
          type: Number,
          required: true
        }
      },
      data: function () {
        return {
          tweeningValue: 0
        }
      },
      watch: {
        value: function (newValue, oldValue) {
          this.tween(oldValue, newValue)
        }
      },
      mounted: function () {
        this.tween(0, this.value)
      },
      methods: {
        tween: function (startValue, endValue) {
          var vm = this
          function animate () {
            if (TWEEN.update()) {
              requestAnimationFrame(animate)
            }
          }
    
          new TWEEN.Tween({ tweeningValue: startValue })
            .to({ tweeningValue: endValue }, 500)
            .onUpdate(function (object) {
              vm.tweeningValue = object.tweeningValue.toFixed(0)
            })
            .start()
    
          animate()
        }
      }
    })
  ```
  
  > * 渐变动画：
  
  ```
    var coords = { a: 1 };
    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
    requestAnimationFrame(animate);
    
    new TWEEN.Tween(coords)
      .to({ a: 1.3 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(()=>{
        this.domPage.style.setProperty('transform', 'scale('+coords.a+')');
      })
      .start();
  ```
  
### 6. 使用 `ref` 获取dom元素的信息

  >（1）在dom元素属性添加 `ref` 自定义值
  
  ```
    <div class="type" ref="type" :style="{ height: typeHeight + 'px' }">
  ```
  
  >（2）在 `data` 注册变量存储初始值
  
  ```
    //...
    typeHeight: 0,
  ```
  
  >（3）在 `mounted` 钩子函数获取dom元素信息
  
  ```
    //...
    mounted() {
      this.typeHeight = document.documentElement.clientHeight - this.$refs.type.getBoundingClientRect().top;
    },
  ```
  
### 7. 使用css3 `shape-outside` 设置文字围绕
  
  >（1）结构：将图片与文字同级排放
  
  ```
    <section class="txt">
        <p>CSS即层叠样式表（Cascading StyleSheet）。 在网页制作时采用层叠样式表技术，可以有效地对页面的布局、字体、颜色、背景和其它效果实现更加精确的控制。</p>
        <img id="img" src="images/ying_3.png" class="lapland" />
        <p>CSS3是CSS技术的升级版本，CSS3语言开发是朝着模块化发展的。以前的规范作为一个模块实在是太庞大而且比较复杂，所以，把它分解为一些小的模块，更多新的模块也被加入进来。这些模块包括： 盒子模型、列表模块、超链接方式 、语言模块 、背景和边框 、文字特效 、多栏布局等。</p>
        <p>丰富了对链接下划线的样式，以往的下划线都是直线，这次可不一样了，有波浪线、点线、虚线等等，更可对下划线的颜色和位置进行任意改变。（还有对应顶线和中横线的样式，效果与下划线类似）对应属性。</p>
    </section>
  ```
  
  >（2）样式：将图片浮动并添加 `shape-outside` 进行边框裁剪
  
  ```
    .lapland {
        float: left;
        shape-outside: inset(5px 10px 15px 20px round 45%);
        /* 或者以下写法：
        shape-outside: border-box;
        border-radius: 50%;
        */
        max-width: 75px;
        width: 70%;
    }
  ```
  
  >（3）重点剖析： `shape-outside: inset(5px 10px 15px 20px round 45%);`
  > * `5px 10px 15px 20px` 分别指变形图形离原位置盒子上、右、下、左的距离
  > * `round 45%` 设置变形图形的边框圆角
  
  * 提示：`round` 建议设置大一些较好，大于50%无效。

### 8. `methods: {mouseMove(e){}}` 与 `methods: {mouseMove:(e)=>{}}` 的重大区别

  * `methods: {mouseMove(e){}}` 的 `this` 指的是 `VueComponent` ，即当前组件的vm实例
  
  * `methods: {mouseMove:(e)=>{}}` 的 `this` 指的是 `a` ，即 `methods` 函数对象，它隶属于vm实例，通过 `this.a` 可获得初始化时的数据，而无法获得变化后的数据

### 9. 使用 `<keep-alive><router-view></router-view></keep-alive>` 缓存部分页面或者组件

  >（1）在 `<template>` 中使用组件：
  
  ```
    <template>
      <!--作品展示页面-->
      <div class="two">
        <div class="box">
          <div class="box-wrapper">
            <div class="container">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </template>
  ```
  
  >（2）在 `/router/index.js` 作为子组件引入，此时需要设置默认页面的子路由作为重定向路径：
  
  ```
  //...
    // 首页
    {
      path: '/index',
      redirect: '/index/home',
      name: 'Home',
      component: Index,
      children: [
        {
          path: 'home',
          component: Two_Home
        },
        {
          path: 'works',
          component: Two_Works
        }
      ]
    },
  ```
  
  * 由于缓存组件导致页面跳转时原组件变量变成 `undefined` 报错问题：
  
  > * 在 `data` 、 `created` 、 `mounted` 里面的数据只会一直保留最开始的值——改在 `computed` + `watch` 声明和执行

  * 若在 `computed` 获取 `this.$route.query.categoryId` 路由参数时会报 `undefined` 的错误：

  > * 原因，当页面返回或者发生任何路径改变导致 `query` 无参数时，均返回 `undefined`——或判断赋予默认值，如下：
  
  ```
    //...
    computed: {
      curKsfpIndex(){
        return this.$store.state.curKsfpIndex;
      },
      curCategoryId(){
        return this.$route.query.categoryId || 0;
      }
    },
  ```

### 10. css3美化滚条：
  
  * 仅兼容 `webkit` 内核的浏览器
  
  ```
    ::-webkit-scrollbar 滚动条整体部分
    ::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
    ::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
    ::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
    ::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
    ::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
    ::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
  ```
  
  * 实例如下；
  
  ```
    .container {
      width: 100%;
      height: 315px;
      overflow: auto;
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
        border-radius: 10px;
      }
  
      &::-webkit-scrollbar {
        width: 10px;
        background-color: #F5F5F5;
      }
  
      &::-webkit-scrollbar-thumb {
        background-color: #AAA;
        border-radius: 10px;
        background-image: -webkit-linear-gradient(90deg,
          rgba(0, 0, 0, .2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(0, 0, 0, .2) 50%,
          rgba(0, 0, 0, .2) 75%,
          transparent 75%,
          transparent)
      }
    }
  ```

### 11. `npm` 全局安装报错问题：

  ```
    npm ERR! path C:\Program Files\nodejs\node_modules\.staging
    npm ERR! code EPERM
    npm ERR! errno -4048
    npm ERR! syscall mkdir
    npm ERR! Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging'
    npm ERR!     at Error (native)
    npm ERR!  { Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging'
    npm ERR!     at Error (native)
    npm ERR!   cause:
    npm ERR!    { Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging'
    npm ERR!        at Error (native)
    npm ERR!      errno: -4048,
    npm ERR!      code: 'EPERM',
    npm ERR!      syscall: 'mkdir',
    npm ERR!      path: 'C:\\Program Files\\nodejs\\node_modules\\.staging' },
    npm ERR!   stack: 'Error: EPERM: operation not permitted, mkdir \'C:\\Program Files\\nodejs\\node_modules\\.staging\'\n    at Error (native)',
    npm ERR!   errno: -4048,
    npm ERR!   code: 'EPERM',
    npm ERR!   syscall: 'mkdir',
    npm ERR!   path: 'C:\\Program Files\\nodejs\\node_modules\\.staging',
    npm ERR!   parent: 'gulp-cli' }
    npm ERR!
    npm ERR! Please try running this command again as root/Administrator.
    
    npm ERR! A complete log of this run can be found in:
    npm ERR!     C:\Users\Administrator\AppData\Roaming\npm-cache\_logs\2018-01-17T03_46_42_020Z-debug.log
  ```
  
  * 解决方法：使用管理员权限打开cmd再全局安装 —— 右键菜单 -> 打开 `命令提示符(管理员)(A)`
  
### 12. [vue $router 与 $route 的区别](https://segmentfault.com/a/1190000009392552)  
  
  * `$router` ： 为 `VueRouter` 的实例，作用是改变实例的 `router` 对象数据！
  
  * `$route` ： 为浏览器的路由信息对象，无需 `VueRouter` 插件也可使用！
  
### 13. `pdf.js` 使用：

  >（1）安装：
  
  ```
    npm install pdfjs-dist --save-dev
  ```
  
  >（2）将pdf文件和依赖包的 `pdf.worker.js` 文件放入 `/static` 目录下方便引入
  
  ```
    import pdfjsLib from 'pdfjs-dist'
    
    // ...
    pdfPath: 'static/resouces/word_1.pdf'
    
    // ...
    pdfjsLib.PDFJS.workerSrc = 'static/js/pdf.worker.js'
  ```
  
  >（3）完整过程：
  
  ```
    import pdfjsLib from 'pdfjs-dist'
    
    export default {
      name: 'word',
      data () {
        return {
          pdfPath: 'static/resouces/word_' + this.wordId + '.pdf',
          canvas: {}
        }
      },
      computed: {},
      created () {},//vm实例创建完成后，可调用data和<template></template>（仅执行一次）
      mounted () {
        pdfjsLib.PDFJS.workerSrc = 'static/js/pdf.worker.js';
        this.canvas = document.getElementById('theCanvas');
        this.loadingPdf();
      },//dom对象挂载完成后，可ajax初始化数据（仅执行一次）
      methods: {
        loadingPdf(){
          let loadingTask = pdfjsLib.getDocument(this.pdfPath);
          loadingTask.promise.then((pdfDocument)=>{
            return pdfDocument.getPage(1).then((pdfPage)=>{
              let scale = Math.floor(this.$store.getters.twoWordWith/595*100)/100;
              let viewport = pdfPage.getViewport(scale);
              this.canvas.width = viewport.width;
              this.canvas.height = viewport.height;
              let ctx = this.canvas.getContext('2d');
              let renderTask = pdfPage.render({
                canvasContext: ctx,
                viewport: viewport
              });
  
              return renderTask.promise;
            });
          }).catch((reason)=>{
            console.error('Error: ' + reason);
          });
        }
      },
      props: [ 'wordId' ],
      watch: {},
      filters: {},//filterFun: value => {  return value  }  -> {{ msg | filterFun }}
      components: {
        //      组件名
      }
    }
  ```
  
  [参考官网github](https://github.com/mozilla/pdf.js/wiki/Setup-pdf.js-in-a-website)

### 14. 取小数点后两位数：

  ```
    Math.floor(15.7784514000 * 100) / 100
  ```
  
  * 以此类推，取一位如下：
  
  ```
    Math.round(15.7784514000 * 10) / 10
  ```

### 15. 结合 `element-ui` 组件的滚条事件问题

  * 常规浏览器下，滚动条事件是不发生事件捕捉和冒泡的，但 `element-ui` 部分组件是无法通过 `@` 属性绑定事件
  
  * 解决方法：
  
  > * 在 `element-ui` 组件组件外通过 事件捕捉 方式绑定滚条事件
  
  ```
    <div class="two-works"
         :style="{ 'height': $store.getters.towBoxHeight + 'px' }"
         @mousewheel="addConWheel"
         @wheel="addConWheel">
      <el-container>
        <!--各个组件-->
        <el-header>{{ curWorkTitle }}</el-header>
    
        <el-container>
          <el-aside width="15%">Aside</el-aside>
    
          <el-main id="container" :class="{ 'isWordBg': $route.query.category==='word'||'ppt' }">
            <component :is="$route.query.category" :workInfo="workInfo"></component>
          </el-main>
        </el-container>
      </el-container>
    </div>
  ```
  
  > * 给 `element-ui` 组件一个id，然后强制添加监听事件
  
  ```
    //...
    ,
    methods: {
      stopPropagation(e){
        e.stopPropagation();
      },
      addConWheel(){
        this.domContainer.removeEventListener('mousewheel', this.stopPropagation);
        this.domContainer.removeEventListener('wheel', this.stopPropagation);
        this.domContainer.addEventListener('mousewheel', this.stopPropagation);
        this.domContainer.addEventListener('wheel', this.stopPropagation);
      }
    
  ```
  
### 16. 在 `vue` 的 `data` 中使用 `this` 问题

  * 如下写法会把所有用 `this` 获取的变量报 `undefined` 错：
  ```
    data () {
      return {
        curWorkId: 0,
        curCategoryId: this.$route.query.categoryId,
        domContainer: {},
        worksList: [
          {
            name: 'word',
            list: [
              {
                workTitle: '基于多杆结构的康复机器人设计',
                fileName: 'word_01.pdf',
                publishTime: '2017-01-01',
                category: '论文展示类',
                views: 888,
                averageMark: 3.9,
                markPeople: 100
              }
            ]
          }
        ],
        workInfo: (function () {
          if (this.worksList[this.curCategoryId].list.length === 0) {
            return null;
          } else {
            return this.worksList[this.curCategoryId].list[this.curWorkId];
          }
        })(),
        curWorkTitle: this.workInfo ? this.workInfo.workTitle : '无标题'
      }
    }
  ```

  * `vue` 的 `data` 方法是在组件实例化之前作为初始化变量而存在的，因此无法在期间就通过 `this` 获取实例化对象的属性赋值
  
  * 但是，`this.$route` 和 `props` 的属性是除外的，因为这是浏览器/父组件先创建后vm内置的对象，可以在 `data` 初始化阶段获取
  
  * 顺便提一句 `props` 属性是父组件实例化在先赋值，因此无需等待子组件实例化便可调用
  
  * 建议在 `data` 中所有初始数据均赋予定值，然后在 `created` 中通过 `this` 相互赋值
  
### 17. 组建命名问题

  * 公开的组件 `name` 属性值不能为常规内置html标签重名 或 以数字开头的
  
  ```
    export default {
      name: 'video',// '3d' 也不行
      ...
    }
  ```
  
  报错如下：
  
  ```
  [Vue warn]: Do not use built-in or reserved HTML elements as component id: video
  ```
  
### 18. `vue` 中无需重复赋值，实时缓存更新，解决undefined报错问题的三种数据绑定模式：
  
  >（1） `computed` ：独立组件使用
  
  ```
    computed: {
      curKsfpIndex(){
        return this.$store.state.curKsfpIndex;
      }
    },
  ```
  
  >（2） `props` ： 父子组件公用
  
  ```
    props: [ 'workInfo' ],
  ```
  
  >（3） `v-model` ：表单、父子组件数据双向绑定均可使用
  
  ```
    <component :is="$route.query.category" 
               :workInfo="workInfo" 
               v-model="isRendering">
    </component>
  ```
  
  * 注意： `data` 仅第一次赋值有效；`watch` 除第一次外有效，特别注意，当监听 `computed` 发生变化后调用方法时，防止其与初始化时调用的方法发生冲突
  
### 19. Vue-Video-Player的使用

  >（1）安装依赖包：
  
  ```
    npm install vue-video-player --save
  ```
  
  >（2）若非兼容外国网站视频（如youtube），则无需全局引入并配置，正常建议组件引入：
  
  ```
    import 'video.js/dist/video-js.css'
    
    import { videoPlayer } from 'vue-video-player'
    
    export default {
      components: {
        videoPlayer
      }
    }
  ```
  
  >（3）[基本实例代码](https://github.com/surmon-china/vue-video-player/blob/master/examples/01-video.vue)
  
  >（4）优化播放器组件和样式：
  
  ```
    // 组件
    <video-player  class="vjs-custom-skin myVjs-skin"
                   ref="videoPlayer"
                   :options="playerOptions"
                   :playsinline="true"
                   @play="onPlayerPlay($event)"
                   @pause="onPlayerPause($event)"
                   @ended="onPlayerEnded($event)"
                   @loadeddata="onPlayerLoadeddata($event)"
                   @waiting="onPlayerWaiting($event)"
                   @playing="onPlayerPlaying($event)"
                   @timeupdate="onPlayerTimeupdate($event)"
                   @canplay="onPlayerCanplay($event)"
                   @canplaythrough="onPlayerCanplaythrough($event)"
                   @ready="playerReadied"
                   @statechanged="playerStateChanged($event)">
    </video-player>
  
    // 选项
    playerOptions: {
      width: this.$store.getters.twoVideoWidth,//设置视频宽度（字符串/数字）
      autoplay: false,//设置是否自动播放
      language: 'zh-CN',//设置语言
      playbackRates: [0.5, 1.0, 1.5, 2.0],//设置播放速度选项
      sources: [{
        type: "video/mp4",
        src: 'static/resouces/video_01.mp4'
      }],//设置视频资源列表
      poster: "static/resouces/poster.jpg",//设置预览图片
      preload: 'auto',//设置预加载方式
      notSupportedMessage: '此视频暂无法播放，请稍后再试',//设置无法播放视频显示内容
      controlBar: {
        volumePanel: {
          inline: false//设置音量组件竖向
        },//设置音量组件选项
        remainingTimeDisplay: false//设置是否显示剩余时间组件
      }
    }
    
    // 样式
    .myVjs-skin .vjs-volume-control.vjs-volume-vertical {
      visibility: hidden;
      height: 7em!important;
      bottom: 7em!important;
    }
  ```
  
  > * 播放器事件触发顺序：`playerReadied` -> `onPlayerLoadeddata` -> `playerStateChanged` -> `onPlayerCanplay` -> `playerStateChanged` -> `onPlayerCanplaythrough` -> ...

  * 文档参考： [Vue-Video-Player](https://surmon-china.github.io/vue-video-player/) | [video.js](http://videojs.com/getting-started/)
  
### 20. `$refs` 的使用

  * `$refs` 可以获取所有已注册 `ref` 的子组件，只可读不可改写，减少获取dom的消耗
  
  * 经改写的子组件，如 `<video-player>` 会导致丢失原始配置的方法，因此 `$refs` 只能用于原始标签元素
  
### 21. 数组 push() 方法常错点

  * `push()` 用于向数组末尾添加元素，但是此方法在调用完后，返回的不是新的数组，而是数组长度，谨记！！！
  
### 22. 兼容 IE、Firefox 等浏览器

* 共同问题：

  >（1）第一次，视频弹幕表单聚焦时，按下确认键会导致页面刷新
    
  ```
    document.querySelector('#form').addEventListener('keydown', (evt)=>{
      let event = evt || window.event;
      event.preventDefault();
    });
  ```
  
  >（2）从有作品到无作品类别，等待蒙版不消失 -> 无作品类统一设置值
  
  ```
    export default {
      name: 'd3',
      data () {
        return {
          isRendering: true
        }
      },
      computed: {},
      created () {},//vm实例创建完成后，可调用data和<template></template>（仅执行一次）
      mounted () {
        this.isRendering = false;
      },//dom对象挂载完成后，可ajax初始化数据（仅执行一次）
      methods: {},
      props: [ 'workInfo' ],
      watch: {
        isRendering(val){
          this.$emit('input', val);
        }
      },
      filters: {},//filterFun: value => {  return value  }  -> {{ msg | filterFun }}
      components: {
        //      组件名
      }
    }
  ```
  
* 360、QQ浏览器的问题：
  
  >（1）第三页 对于某些屏高较小的 会导致超出氛围 -> 为了兼容牺牲一下美观
  
  ```
    overflow-x: hidden;
    overflow-y: auto;
  ```
  
* Firefox浏览器的问题：
  
  >（1）第一页文字围绕无法做到Chrome不规则边界效果 -> 不做兼容
  
  >（2）第二页 home 组件不在预设范围 -> css hack 改变位置
  
  ```
    @-moz-document url-prefix(){
      .box-wrapper{
        margin-top: -31.2%!important;
      }
    }
  ```
  
  >（3）第二页 works 的 header 组件被覆盖 -> 不用浮动，改用flex盒
  
  ```
    .el-header {
      @include child-center('y');
      background-color: #B3C0D1;
      color: $color-theme;
      line-height: 50px;
      font-size: $font-20px;
      font-weight: bolder;
      .back-btn {
        cursor: pointer;
        flex: .5;
      }
  
      .title {
        @include ellipsis;
        flex: 9;
        text-align: center;
      }
  
      .fs-btn {
        text-align: right;
        cursor: pointer;
        flex: .5;
      }
    }
  ```
  
  >（4）第二页 works 的 header 组件被设为可滚动 -> css hack 隐藏滚动条
  
  ```
    overflow:-moz-scrollbars-none;
  ```
  
  >（5）表单无法输入内容 -> 当按下 `enter` 键才阻止默认行为
  
  ```
    document.querySelector('#form').addEventListener('keydown', (evt)=>{
      let event = evt || window.event;
      
      if(event.keyCode === 13) event.preventDefault();
    });
  ```
  
  >（6）作品 aside 分项列超出范围 -> css hack 不使用flex盒
  
  ```
    @-moz-document url-prefix(){
      .nullWork{
        display: block!important;
        width: 14px!important;
        margin: 0 auto!important;
      }
    }
  ```
  
* IE11浏览器的问题：
  ... 
  
