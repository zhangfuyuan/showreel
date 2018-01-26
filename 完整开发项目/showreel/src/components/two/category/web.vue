<template>
  <!--页面类别-->
  <div class="web">
    <!--各个组件-->
    <div class="nullWork">
      网页设计类作品有待上线......
    </div>
  </div>
</template>

<script>
  //  import { 模块名 } from '插件名'
  //  import 组件名 from '@/components/组件文件名'

  export default {
    name: 'web',
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
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .web {
    height:100%;
    .nullWork {
      height:100%;
      @include child-center;
    }
  }
</style>
