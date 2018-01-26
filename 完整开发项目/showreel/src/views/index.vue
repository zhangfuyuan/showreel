<template>
  <!--首页-->
  <div class="index">
    <!--视差效果背景图-->
    <div :class="[ 'parallax-bg', { 'p1': curKsfpIndex===0, 'p2': curKsfpIndex===1, 'p3': curKsfpIndex===2 } ]">
      <img class="ying ying_auto1" src="../assets/images/ying_2.png" alt="自动鹰2" />
      <img class="ying ying_auto2" src="../assets/images/ying_3.png" alt="自动鹰3" />
    </div>

    <div :class="[ 'music', { 'ani': audioPlaying, 'ani-paused': !audioPlaying }, { 'under-z-index': $store.state.isAudioBtnHide } ]">
      <!-- autoplay -->
      <audio id="BGM" src="static/resouces/SofiaJannok.mp3" preload autoplay loop></audio>
      <img src="../assets/images/music_btn.png"
           alt="音乐播放图标"
           @click="audioToggle"
           :title=" audioPlaying ? '停止' : '播放' "
           :class="{ 'hide': $store.state.isAudioBtnHide }"/>
    </div>

    <div class="changetip">
      <i class="el-icon-arrow-up up" v-show="isUpTipShow"></i>

      <i class="el-icon-arrow-down down" v-show="isDownTipShow"></i>
    </div>

    <!-- our main component -->
    <ksvuefp :options="options" :sections="sections">
      <!-- our section component -->
      <ksvuefp-section v-for="(section, index) in sections" :section="section" :key="index" :section-index="index">
        <!-- Use Vue-ish way for content animations and transitions. Using !$ksvuefp.slidingActive in v-show will result in content waiting for transitions between sections to finish before animating in -->
        <transition name="fade">
          <div v-show="$ksvuefp.canAnimContent(index, true)">
            <component :is="section.key"></component>
          </div>
        </transition>
      </ksvuefp-section>
    </ksvuefp>
  </div>
</template>

<script>
  import Hammerjs from 'hammerjs'
  import VelocityAnimate from 'velocity-animate'
  import 'ks-vue-fullpage/dist/ks-vue-fullpage.min.css'
  import One from '@/components/One'
  import Two from '@/components/Two'
  import Three from '@/components/Three'
  import myTools from '@/assets/js/myTools'

  export default {
    name: 'index',
    data () {
      return {
        sections: [
          {
            key: 'one'
          },
          {
            key: 'two'
          },
          {
            key: 'three'
          }
        ],
        options: {
          // Your custom options here
          preloaderColor: '#472D30',
          preloaderText: '爱等不等，右上不送...',
          dotNavColor: '#472D30',
          duration: 800,
          overlay: 'rgba(0, 0, 0, 0.15)'
        },
        audioPlaying: true,
        isUpTipShow: false,
        isDownTipShow: true
      }
    },
    computed: {
      curKsfpIndex(){
        return this.$ksvuefp.currentIndex;
      }
    },
    created () {

    },
    mounted () {
      this.$store.commit('getClientWidth', document.documentElement.clientWidth);
      this.$store.commit('getClientHeight', document.documentElement.clientHeight);

      if (myTools.others.whatBrowser() === 'Edge') {
        this.$alert('您使用的浏览器为 Microsoft Edge，目前此网站暂 Not Supported！', 'Compatibility 警告', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `您的选择: ${ action }`
            });
          }
        });
      }
    },
    methods: {
      audioToggle(){
        let audioEle = document.querySelector('#BGM');

        this.audioPlaying = !this.audioPlaying;
        audioEle.paused ? audioEle.play() : audioEle.pause();
      }
    },
    props: {},
    watch: {
      curKsfpIndex(val){
        this.$store.commit('changeKsfpIndex', val);

        if (val === 0) {
          this.isUpTipShow = false;
          this.isDownTipShow = true;
        } else if (val === 1) {
          this.isUpTipShow = true;
          this.isDownTipShow = true;
        } else if (val === 2) {
          this.isUpTipShow = true;
          this.isDownTipShow = false;
        }
      }
    },
    filters: {},
    components: {
      'one': One,
      'two': Two,
      'three': Three
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .ksvuefp-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
    opacity: 1;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

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

      .ying {
        width: 50px;
        height: auto;
        position: absolute;
      }
      .ying_auto1 {
        top: 75%;
        left: 50%;
        animation: ying1-ani 20s linear 0s infinite;
       }
      .ying_auto2 {
        top: 100%;
        left: 70%;
        animation: ying2-ani 40s linear 0s infinite;
      }
    }

    .music {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      opacity: .5;
      z-index: 999;
      &.ani {
        animation: audio-ani 2s linear 0s infinite running;
      }
      &.ani-paused {
        animation: audio-ani 2s linear 0s infinite paused;
      }

      img {
        width: 100%;
        height: auto;
      }

      &.under-z-index {
        z-index: -1;
      }
    }

    .changetip {
      position: absolute;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: $font-26px;
      i {
        position: absolute;
        left: 50%;
        margin-left: -13px;
        opacity: .8;
      }

      .up {
        top: 5%;
        animation: uptip-ani 2s ease-out 0s infinite;
      }

      .down {
        bottom: 5%;
        animation: downtip-ani 2s ease-out 0s infinite;
      }
    }
  }

  @keyframes audio-ani {
    0%{
      transform: scale(1) rotate(0deg);
    }
    25%{
      transform: scale(.9) rotate(90deg);
    }
    50%{
      transform: scale(1) rotate(180deg);
    }
    75%{
      transform: scale(1.1) rotate(270deg);
    }
    100%{
      transform: scale(1) rotate(360deg);
    }
  }
  @keyframes ying1-ani {
    0%{
      top: 75%;
      left: 50%;
      transform: scale(1) rotate(0deg);
    }
    50%{
      top: 77%;
      left: 45%;
      transform: scale(.3) rotate(-30deg);
    }
    100%{
      top: 72%;
      left: 40%;
      transform: scale(.1) rotate(45deg);
    }
  }
  @keyframes ying2-ani {
    0%{
      top: 100%;
      left: 70%;
      transform: scale(1) rotate(0deg);
    }
    50%{
      top: 73%;
      left: 88%;
      transform: scale(.4) rotate(-20deg);
    }
    100%{
      top: 75%;
      left: 100%;
      transform: scale(.2) rotate(15deg);
    }
  }

  @keyframes uptip-ani {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(15px);
    }
    100% {
      opacity: .8;
      transform: translateY(0);
    }
  }
  @keyframes downtip-ani {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(-15px);
    }
    100% {
      opacity: .8;
      transform: translateY(0);
    }
  }
</style>
