<template>
  <!--页面类别-->
  <div class="two-home" :style="{ 'height': $store.getters.towBoxHeight + 'px' }">
    <el-container>
      <!--头部-->
      <el-header>{{ title }}</el-header>

      <!--正文-->
      <el-main>
        <el-carousel :interval="3000" type="card" :height="($store.getters.towBoxHeight-127)+'px'" @change="getCurIndex">
          <el-carousel-item v-for="(item, index) in categoryList" :key="index">
            <router-link :to="'./works?category='+item.name+'&categoryId='+index">
              <div class="img"></div>

              <p class="txt" id="carouselTxt">有{{ item.introduce }}等作品</p>
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  //  import { 模块名 } from '插件名'
  //  import 组件名 from '@/components/组件文件名'

  export default {
    name: 'two-home',
    data () {
      return {
        title: '',
        categoryList: [
          {
            name: 'word',
            category: '论文展示类',
            introduce: '可拓创新方法论文、“挑战杯”赛事宣传影视广告方案、《中国好声音》栏目冠名广告的作用效果分析、四六级备考、数据库、茶文化、影视剪辑、旅游地理、专业调查'
          }, {
            name: 'ppt',
            category: 'PPT展示类',
            introduce: '英美饮食文化差异演讲、户外直播APP、APP交互设计'
          }, {
            name: 'my-video',
            category: '视频展示类',
            introduce: '3D动画芭蕾舞、卧室paly、影视技术'
          }, {
            name: 'flash',
            category: 'Flash应用类',
            introduce: 'AS计算器、压水果和抢红包游戏'
          }, {
            name: 'exe',
            category: 'exe应用类',
            introduce: 'C++黑白棋、主动块课程设计、计算机图形学、可视化工程、广州地铁-数据结构'
          }, {
            name: 'web',
            category: '网页设计类',
            introduce: '网页设计、php网站、24节气'
          }, {
            name: 'three-d',
            category: '三维应用类',
            introduce: '室内漫游、换装秀、广工漫游、富氢水杯'
          }, {
            name: 'app',
            category: 'APP交互类',
            introduce: '冻货app、户外直播APP'
          }, {
            name: 'design',
            category: '设计展示类',
            introduce: '视觉设计、视觉传达'
          }, {
            name: 'java',
            category: 'Java应用类',
            introduce: '课程分数小程序、手机游戏'
          }
        ]
      }
    },
    computed: {
      curKsfpIndex(){
        return this.$store.state.curKsfpIndex;
      }
    },
    created () {},//vm实例创建完成后，可调用data和<template></template>（仅执行一次）
    mounted () {},//dom对象挂载完成后，可ajax初始化数据（仅执行一次）
    methods: {
      getCurIndex(index){
        this.title = this.categoryList[index].category;
      }
    },
    props: {},
    watch: {
      curKsfpIndex(newVal, oldVal){

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

  .two-home {
    &>.el-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        font-size: $font-20px;
        font-weight: bold;
      }

      .el-main {
        @include scrollbar;
        .el-carousel__item {
          a {
            @include child-center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            color: #000;
            .img {
              width: 100%;
              flex: 7.5;
            }

            .txt {
              @include ellipsis(3);
              width: 100%;
              box-sizing: border-box;
              padding: $inner-between;
              flex: 2.5;
              text-indent: 2rem;
              background-color: #fff;
              line-height: 1.67;
            }
          }

          &:nth-child(2n) a .img {
            background-color: #99a9bf;
          }

          &:nth-child(2n+1) a .img {
            background-color: #d3dce6;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1080px) {
    #carouselTxt {
      @include ellipsis(2);
      line-height: 1.8;
    }
  }
</style>
