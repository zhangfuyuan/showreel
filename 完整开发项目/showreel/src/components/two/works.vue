<template>
  <!--页面类别-->
  <div class="two-works" id="worksPage" :style="{ 'height': $store.getters.towBoxHeight + 'px' }">
    <el-container>
      <!--各个组件-->
      <el-header height="50px">
        <i class="el-icon-arrow-left back-btn" @click="$router.go(-1)" title="返回"></i>
        <span class="title">{{ curWorkTitle }}</span>
        <i class="el-icon-mobile-phone fs-btn"
           @click="fullScreen"
           :title="!isFullScreen ? '全屏' : '还原'"></i>
      </el-header>

      <el-container>
        <el-aside width="15%">
          <ul v-if="worksList[curCategoryId].list.length > 0">
            <li v-for="(item, index) in worksList[curCategoryId].list" :key="index">
              <el-tooltip class="item" effect="light" :content="item.workTitle" placement="left">
                <el-button class="aside-btn"
                           size="small"
                           type="info"
                           round
                           :loading="isRendering"
                           @click="changeWorksId(index)">{{item.workTitle}}</el-button>
              </el-tooltip>
            </li>
          </ul>

          <div class="nullWork" v-else>暂无作品，请浏览其它类的作品呗！</div>
        </el-aside>

        <el-main id="container"
                 :class="{ 'isWordBg': $route.query.category==='word'||$route.query.category==='ppt' }"
                 v-loading="isRendering"
                 element-loading-text="拼命加载中"
                 element-loading-background="rgba(0, 0, 0, 0.8)">
          <component :is="$route.query.category"
                     :workInfo="workInfo"
                     :isFullScreen="isFullScreen"
                     v-model="isRendering"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import TWEEN from '@tweenjs/tween.js'
  import Word from '@/components/two/category/word'
  import Ppt from '@/components/two/category/ppt'
  import MyVideo from '@/components/two/category/video'
  import Flash from '@/components/two/category/flash'
  import Exe from '@/components/two/category/exe'
  import Web from '@/components/two/category/web'
  import D3 from '@/components/two/category/3d'
  import App from '@/components/two/category/app'
  import Design from '@/components/two/category/design'
  import Java from '@/components/two/category/java'

  export default {
    name: 'two-works',
    data () {
      return {
        domContainer: null,
        domPage: null,
        curWorkId: 0,
        isRendering: false,
        isFullScreen: false,
        worksList: [
          {
            name: 'word',
            list: [
              {
                workTitle: '“挑战杯”赛事宣传影视广告方案',
                fileName: 'word_01.pdf',
                publishTime: '2015-11-01',
                category: '论文展示类',
                views: 881,
                averageMark: 3.1,
                markPeople: 20
              }, {
                workTitle: '《中国好声音》栏目冠名广告的作用效果分析',
                fileName: 'word_02.pdf',
                publishTime: '2017-01-01',
                category: '论文展示类',
                views: 882,
                averageMark: 3.2,
                markPeople: 20
              }, {
                workTitle: '人工智能的发展与未来',
                fileName: 'word_03.pdf',
                publishTime: '2016-10-15',
                category: '论文展示类',
                views: 883,
                averageMark: 3.3,
                markPeople: 20
              }, {
                workTitle: '基于可拓创新方法的伞类产品创意生成',
                fileName: 'word_04.pdf',
                publishTime: '2015-11-11',
                category: '论文展示类',
                views: 884,
                averageMark: 3.4,
                markPeople: 20
              }, {
                workTitle: '电影《夺命金》欣赏',
                fileName: 'word_05.pdf',
                publishTime: '2016-11-03',
                category: '论文展示类',
                views: 885,
                averageMark: 3.5,
                markPeople: 20
              }, {
                workTitle: '公益活动管理系统',
                fileName: 'word_06.pdf',
                publishTime: '2017-06-15',
                category: '论文展示类',
                views: 886,
                averageMark: 3.6,
                markPeople: 20
              }, {
                workTitle: 'American and British diet culture',
                fileName: 'word_07.pdf',
                publishTime: '2017-01-01',
                category: '论文展示类',
                views: 887,
                averageMark: 3.7,
                markPeople: 20
              }, {
                workTitle: '浅谈中国茶文化与日本茶道',
                fileName: 'word_08.pdf',
                publishTime: '2017-01-01',
                category: '论文展示类',
                views: 888,
                averageMark: 3.8,
                markPeople: 20
              }, {
                workTitle: '我曾涉足过的“天堂”——云南',
                fileName: 'word_09.pdf',
                publishTime: '2017-01-01',
                category: '论文展示类',
                views: 889,
                averageMark: 3.9,
                markPeople: 20
              }
            ]
          }, {
            name: 'ppt',
            list: [
              {
                workTitle: '英美饮食文化',
                fileName: 'ppt_01.pdf',
                publishTime: '2017-01-01',
                category: 'PPT展示类',
                views: 881,
                averageMark: 3.1,
                markPeople: 20,
                pptWidth: 720
              }, {
                workTitle: '逐流',
                fileName: 'ppt_02.pdf',
                publishTime: '2017-01-01',
                category: 'PPT展示类',
                views: 882,
                averageMark: 3.2,
                markPeople: 20,
                pptWidth: 960
              }, {
                workTitle: '移动端APP的交互设计案例分析',
                fileName: 'ppt_03.pdf',
                publishTime: '2017-01-01',
                category: 'PPT展示类',
                views: 883,
                averageMark: 3.3,
                markPeople: 20,
                pptWidth: 960
              }
            ]
          }, {
            name: 'video',
            list: [
              {
                videoId: 0,
                workTitle: '广工短视频',
                fileName: 'video_01.mp4',
                publishTime: '2017-01-01',
                category: '视频展示类',
                views: 881,
                danmakuData: localStorage["danmakuData0"] ? JSON.parse(localStorage["danmakuData0"]) : [
                  {
                    text: '这是第一个视频的第一个弹幕',
                    time: 0,
                    top: 20
                  }, {
                    text: '广工好大！！！',
                    time: 2,
                    top: 40
                  }, {
                    text: '图书馆好看',
                    time: 4,
                    top:60
                  }
                ]
              }, {
                videoId: 1,
                workTitle: '三维动画小视频',
                fileName: 'video_02.mp4',
                publishTime: '2017-01-01',
                category: '视频展示类',
                views: 882,
                danmakuData: localStorage["danmakuData1"] ? JSON.parse(localStorage["danmakuData1"]) : [
                  {
                    text: '这是第二个视频的第一个弹幕',
                    time: 0,
                    top: 20
                  }, {
                    text: '这是谁！？',
                    time: 2,
                    top: 60
                  }, {
                    text: '哇哈哈哈。。。',
                    time: 5,
                    top: 100
                  }
                ]
              }, {
                videoId: 2,
                workTitle: '夜生活短视频',
                fileName: 'video_03.mp4',
                publishTime: '2017-01-01',
                category: '视频展示类',
                views: 883,
                danmakuData: localStorage["danmakuData2"] ? JSON.parse(localStorage["danmakuData2"]) : [
                  {
                    text: '这是第三个视频的第一个弹幕',
                    time: 0,
                    top: 20
                  }, {
                    text: '好黑',
                    time: 1,
                    top: 60
                  }, {
                    text: '这是哪里啊',
                    time: 3,
                    top: 40
                  }
                ]
              }
            ]
          }, {
            name: 'flash',
            list: []
          }, {
            name: 'exe',
            list: []
          }, {
            name: 'web',
            list: []
          }, {
            name: '3d',
            list: []
          }, {
            name: 'app',
            list: []
          }, {
            name: 'design',
            list: []
          }, {
            name: 'java',
            list: []
          }
        ]
      }
    },
    computed: {
      curKsfpIndex(){
        return this.$store.state.curKsfpIndex;
      },
      curCategoryId(){
        return this.$route.query.categoryId || 0;
      },
      workInfo(){
        return this.worksList[this.curCategoryId].list.length===0 ? null : this.worksList[this.curCategoryId].list[this.curWorkId];
      },
      curWorkTitle(){
        return this.workInfo ? this.workInfo.workTitle : '无标题';
      }
    },
    created () {},
    mounted () {
      this.domContainer = document.querySelector('#container');
      this.domContainer.addEventListener('mousewheel', this.stopPropagation);
      this.domContainer.addEventListener('wheel', this.stopPropagation);
      this.domPage = document.querySelector('#worksPage');
    },
    methods: {
      stopPropagation(e){
        e.stopPropagation();
      },
      changeWorksId(id){
        if(id === this.curWorkId) return;

        this.curWorkId = id;
        this.isRendering = true;
      },
      fullScreen(){
        this.isFullScreen = !this.isFullScreen;
        this.$store.commit('changeAudioBtnHide');

        let cssObj = {
          'width': this.isFullScreen ? (this.$store.state.clientWidth+'px') : '100%',
          'height': this.isFullScreen ? (this.$store.state.clientHeight+'px') : (this.$store.getters.towBoxHeight+'px'),
          'position': this.isFullScreen ? 'absolute' : 'static',
          'top': '0',
          'left': '0',
          'z-index': this.isFullScreen ? '999' : 'auto'
        };

        this.domPage.style.setProperty('width', cssObj['width']);
        this.domPage.style.setProperty('height', cssObj['height']);
        this.domPage.style.setProperty('position', cssObj['position']);
        this.domPage.style.setProperty('top', cssObj['top']);
        this.domPage.style.setProperty('left', cssObj['left']);
        this.domPage.style.setProperty('z-index', cssObj['z-index']);
      }
    },
    props: {},
    watch: {},
    filters: {},//filterFun: value => {  return value  }  -> {{ msg | filterFun }}
    components: {
      'word': Word,
      'ppt': Ppt,
      'my-video': MyVideo,
      'flash': Flash,
      'exe': Exe,
      'web': Web,
      'three-d': D3,
      'app': App,
      'design': Design,
      'java': Java
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .two-works {
    &>.el-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;
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

      .el-container {
        .el-aside {
          background-color: #D3DCE6;
          color: #333;
          text-align: center;
          ul {
            @include child-center('x');
            width: 90%;
            margin: 0 auto;
            height: 100%;
            flex-direction: column;
            justify-content: space-around;
            li {
              .aside-btn {
                @include ellipsis;
                width: 100%;
                background-color: rgba(71,45,48,.8);
                border-color: $color-theme;
              }
            }
          }

          .nullWork {
            @include child-center;
            writing-mode: vertical-rl;
            width: 100%;
            height: 100%;
            font-size: $font-14px;
          }

          @-moz-document url-prefix(){
            .nullWork{
              display: block!important;
              width: 14px!important;
              margin: 0 auto!important;
            }
          }
        }

        .el-main {
          @include scrollbar;
          background-color: $color-bgc;
          background-image: url(../../assets/images/texture.png);
          &.isWordBg {
            background-color: #404040;
          }
        }
      }
    }
  }
</style>
