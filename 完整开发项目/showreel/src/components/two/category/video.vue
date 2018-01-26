<template>
  <!--页面类别-->
  <div class="video">
    <!--各个组件-->
    <div class="info">
      <ul>
        <li><span class="txt">发布时间：</span>{{ info.publishTime }}</li>
        <li class="step">|</li>
        <li><span class="txt">所属分类：</span>{{ info.category }}</li>
        <li class="step">|</li>
        <li><span class="txt">浏览人数：</span>{{ info.views }}</li>
        <li class="step">|</li>
        <li><a href="javascript:;"
               id="domPraise"
               class="praise"
               @click="changePraise"></a></li>
      </ul>
    </div>

    <div class="area">
      <div class="area-wrapper">
        <div class="player">
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

          <div id="danmakuBox"
               class="danmaku"
               :style="{ 'visibility': isDanmakuShow ? 'visible' : 'hidden' }">
          </div>
        </div>

        <el-form :inline="true" class="sendbar">
          <el-form-item>
            <el-tooltip class="item" effect="dark" content="弹幕开关" placement="bottom-start">
              <el-switch v-model="isDanmakuShow"></el-switch>
            </el-tooltip>
          </el-form-item>

          <el-form-item>
            <el-input id="danmakuInput" v-model="DanmakuText" placeholder="请输入弹幕内容..."></el-input>
          </el-form-item>

          <el-form-item class="noMarginRight">
            <el-button type="primary" @click="onSubmit">发射弹幕</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import '@/assets/scss/custom-theme.css'
  import { videoPlayer } from 'vue-video-player'
  import myTools from '@/assets/js/myTools'

  export default {
    name: 'my-video',
    data () {
      return {
        info: this.workInfo || {
          videoId: 0,
          workTitle: '*',
          fileName: 'video_01.mp4',
          publishTime: '*',
          category: '*',
          views: 0
        },
        domPraise: null,
        domDanmaku: null,
        domInput: null,
        isPraise: false,
        praiseTimer: null,
        videoRendering: false,
        isDanmakuShow: true,
        DanmakuText: '',
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
        },
        isPlaying: false,
        curTime: 0
      }
    },
    computed: {
      videoPath(){
        return 'static/resouces/' + this.info.fileName;
      },
      videoWidth(){
        return this.isFullScreen ? this.$store.getters.twoVideoFsWidth : this.$store.getters.twoVideoWidth;
      }
    },
    created () {},
    mounted () {
      this.domPraise = document.querySelector('#domPraise');
      this.domDanmaku = document.querySelector('#danmakuBox');
      this.domInput = document.querySelector('#danmakuInput');
      this.loadingVideo();

      this.domInput.addEventListener('keydown', (evt)=>{
        let event = evt || window.event;

        if(event.keyCode === 13) {
          event.preventDefault();
          this.onSubmit();
        }
      });

      myTools.Danmaku.init({
        domDanmaku: this.domDanmaku,
        videoId: this.info.videoId,
        danmakuData: this.info.danmakuData,
        videoWidth: (this.videoWidth>300 ? this.videoWidth : 571),
        videoHeigth: 328.32
      });
    },
    methods: {
      loadingVideo(){
        this.playerOptions.width = (this.videoWidth>300 ? this.videoWidth : 571);
        this.playerOptions.sources[0].src = this.videoPath;
        this.videoRendering = true;
      },
      onPlayerPlay(player) {
        // console.log('player play!', player)
        this.isPlaying = true;
        myTools.Danmaku.move();
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
        this.isPlaying = false;
        myTools.Danmaku.stop();
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
        this.isPlaying = false;
        myTools.Danmaku.removeAllDanmaku();
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
        this.isPlaying = false;
        myTools.Danmaku.removeAllDanmaku();
        myTools.Danmaku.pushDanmakuOfCurtime(0);
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
        this.isPlaying = true;
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
        this.curTime = Math.floor(player.currentTime());
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
        this.videoRendering = false;
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
//         console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {

      },
      changePraise() {
        this.isPraise = !this.isPraise;

        clearInterval(this.praiseTimer);
        this.praiseTimer = null;

        if (this.isPraise) {
          let poX = 0;
          this.praiseTimer = setInterval(()=>{
            poX -= 23;

            if(poX <= -460) clearInterval(this.praiseTimer);

            this.domPraise.style.setProperty('background-position-x', poX+'px');
          }, 30);
        } else {
          this.domPraise.style.setProperty('background-position-x', '0');
        }

        this.info.isPraise = this.isPraise;
      },
      onSubmit(){
        if (this.domInput.value==='') return;

        myTools.Danmaku.addDanmaku({
          domInput: this.domInput,
          curTime: this.curTime
        });

        if (this.isPlaying) myTools.Danmaku.move();
      }
    },
    props: [ 'workInfo', 'isFullScreen' ],
    watch: {
      workInfo(info){
        myTools.Danmaku.removeAllDanmaku();

        if (!info) return;

        this.info = info;
        this.info.views++;
        this.isPraise = this.info.isPraise || false;
        myTools.Danmaku.updateInit({
          videoId: this.info.videoId,
          danmakuData: this.info.danmakuData
        });
        this.loadingVideo();
      },
      videoRendering(val){
        this.$emit('input', val);
      },
      isFullScreen(val){
        myTools.Danmaku.removeAllDanmaku();
        this.playerOptions.autoplay = this.isPlaying;
        myTools.Danmaku.updateInit({
          videoId: this.info.videoId,
          videoWidth: this.videoWidth
        });
        this.loadingVideo();
      },
      isPraise(val){
        if (val) {
          this.domPraise.style.setProperty('background-position-x', '-460px');
        } else {
          this.domPraise.style.setProperty('background-position-x', '0');
        }
      },
      curTime(val){
        if (val === 0) return;

        myTools.Danmaku.stop();
        myTools.Danmaku.pushDanmakuOfCurtime(val);
        myTools.Danmaku.move();
      }
    },
    filters: {},
    components: {
      videoPlayer
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .video {
    position: relative;
    top: -10px;
    overflow: hidden;
    .info {
      color: $color-md-font;
      opacity: .95;
      font-size: $font-14px;
      ul {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        li {
          .txt {
            color: $color-n-font;
          }

          .praise {
            display: block;
            width: 23px;
            height: 28px;
            background: url(../../../assets/images/steps_praised.png) 0 0 no-repeat;
            background-size: 483px 28px;
          }
        }

        .step {
          color: $color-ml-font;
        }
      }
    }

    .area {
      padding-top: $inner-between;
      .area-wrapper {
        position: relative;
        .player {

          .danmaku {
            position: absolute;
            top: 0;
            left: 0;
          }
        }

        .sendbar {
          @include child-center('y');
          justify-content: space-between;
          padding: $inner-between;
          border: 1px solid $color-border;
          border-top: 0;
          background-color: rgba(255, 255, 255, .5);
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
          .el-form-item {
            margin-bottom: 0;
            &.noMarginRight {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
