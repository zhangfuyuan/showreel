<template>
  <!--作品展示页面-->
  <div class="two">
    <div class="box">
      <div class="box-wrapper">
        <div class="container" :style="{ 'height': $store.getters.towBoxHeight + 'px' }">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //  import { 模块名 } from '插件名'
  //  import 组件名 from '@/components/组件文件名'

  export default {
    name: 'two',
    data () {
      return {

      }
    },
    computed: {},
    created () {},
    mounted () {},
    methods: {},
    props: {},
    watch: {},
    filters: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .two {
    .box {
      @include child-center;
      width: 80%;
      margin: 0 auto;
      height: 100%;
      height: 100vh;
      background: url(../assets/images/p2_bg.png) center no-repeat;
      background-size: contain;
      animation: box-ani 1s ease-out;
      .box-wrapper {
        width: 70.2%;
        height: 0;
        margin-top: -2.2%;
        margin-left: -0.4%;
        padding-bottom: 43.6%;
        /*background-color: brown;*/
        .container {
          @include scrollbar;
          width: 100%;
          cursor: url(../assets/images/cursor.png), default;
          overflow: auto;
        }
      }

      @-moz-document url-prefix(){
        .box-wrapper{
          margin-top: -31.2%!important;
        }
      }
    }
  }

  @keyframes box-ani {
    0% {
      opacity: 0;
      transform: scale(.5);
    }
    100% {
      opacity: 1;
      transform: translateY(1);
    }
  }
</style>
