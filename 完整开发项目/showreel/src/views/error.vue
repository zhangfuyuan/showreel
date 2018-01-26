<template>
  <!--页面类别-->
  <div class="error">
    <!--各个组件-->
    404：页面出错！
  </div>
</template>

<script>
  //  import { 模块名 } from '插件名'
  //  import 组件名 from '@/components/组件文件名'

  export default {
    name: 'error',
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
    filters: {},//filterFun: value => {  return value  }  -> { msg | filterFun }
    components: {
//      组件名
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

</style>
