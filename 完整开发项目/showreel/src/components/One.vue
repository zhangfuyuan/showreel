<template>
  <!--第一部分-->
  <div class="one" ref="oneBox" @mousemove="mouseMove">
    <!--第一行-->
    <div class="header">
      <div class="name">
        <div class="logo">
          <img src="../assets/images/logo.png" alt="LOGO" />
        </div>

        <div class="description">
          <div class="name-en">
            <div class="four">4</div>
            <div class="zero-yun">
              <div class="zero">0</div>
              <div class="yun">yun</div>
            </div>
          </div>

          <div class="way" id="test">大学实训个人作品展示网站</div>

          <div class="way-en">A website showing university training works</div>
        </div>
      </div>
    </div>

    <!--第二行-->
    <div class="data">
      <div class="works">
        <div class="title">作品量</div>

        <div class="value">{{works}}</div>
      </div>

      <div class="views">
        <div class="title">浏览量</div>

        <div class="value">{{views}}</div>
      </div>

      <div class="author">
        <div class="title">开发者</div>

        <div class="value">J<span class="small">effrey</span></div>
      </div>
    </div>

    <!--第三行-->
    <div class="container">
      <h2>个人经历</h2>
      <section>
        <p>
          这个网站是本人在2018年的年初计划开发出来的，一方面是为了记录自己的大学生涯辛苦劳作，另一方面是为了综合自己所学的前端技术去搞些事情，当然也是为了毕业后找工作面试时有可以展示的实战作品。
          <img id="ying" src="../assets/images/ying_1.png" alt="控制鹰" />
          回想自己选择从事前端这条路，颇有感触。我的专业是数字媒体技术专业，学的东西五花八门，学了C又学Java，做过flash动画又做3D动画，拍完短片又要剪辑素材，从学平面设计又到交互设计，开发网页又研究游戏，差点又钻进是选安卓还是IOS的无底洞，但，这一切都只是学了皮毛，感觉毕业就等于失业了。
        </p>
        <p>后来，在我大三那年，自己还没确定想从事的方向，于是随便找了份实习，而这一份工作就是Web前端开发，但就在那一年我深深地爱上了Web前端。</p>
        <p>实习期间，我拾起了大二所学的网页设计基础——html、css、js，但这些只是入门，后来苦学js高级部分——面向对象、正则表达式、原型链与继承和AJAX等。有了一些基础，我开始学习基本库jquery，然后赶潮流学了html5、css3、ES6、angularJS、vueJS，还搞过百度地图、微信小程序和移动端开发。随着学习的深入，公司要我搞一部分后台，于是我通过nodeJS、mongodb了解了一些后台的开发流程。而现在，我居然还搞起用jsp和tomcat来开发java web......说了这么多，其实都是为了凑够字数搭配C3的效果(≧∀≦)</p>
      </section>
    </div>
  </div>
</template>

<script>
  import TWEEN from '@tweenjs/tween.js'

  export default {
    name: 'one',
    data () {
      return {
        msg: '',
        works: 0,
        views: 0,
        yingEle: {},
        oneBoxWidth: 0,
        tweeningValue: 0
      }
    },
    computed: {},
    created () {
      this.$store.commit('addViews');
    },//vm实例创建完成后，可调用data和<template></template>（仅执行一次）
    mounted () {
      let _works = 20,
          _views = 0,
          self = this;

      setTimeout(()=>{
        _views = this.$store.state.views;

        new TWEEN.Tween({ tweeningNumber: 0 })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: _works }, 3000)
          .onUpdate(function (object) {
            self.works = object.tweeningNumber.toFixed(0)
          })
          .start();
        new TWEEN.Tween({ tweeningNumber: 0 })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: _views }, 5000)
          .onUpdate(function (object) {
            self.views = object.tweeningNumber.toFixed(0)
          })
          .start();
        this.animate();
      }, 500);

      this.yingEle = document.querySelector('#ying');
    },
    methods: {
      mouseMove(e){
        this.oneBoxWidth = this.$refs.oneBox.getBoundingClientRect().width;

        if (e.clientX<0 || e.clientX>this.oneBoxWidth) return false;

        this.tweeningValue = Math.floor(57 - 56*(e.clientX/this.oneBoxWidth));
        new TWEEN.Tween({ tweeningMarginLeft: 0 })
          .to({ tweeningMarginLeft: this.tweeningValue }, 500)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(()=>{
            this.yingEle.style.setProperty('margin-left', this.tweeningValue + 'px');
          })
          .start();
        this.animate();
      },
      animate () {
        if (TWEEN.update()) requestAnimationFrame(this.animate);
      }
    },
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

  .one {
    width: 80%;
    margin: 50px auto 0;
    height: 100%;
    height: 100vh;
    .header {
      @include child-center('y');
      color: $color-theme;
      animation: header-ani 2s ease-out;
      .name {
        display: flex;
        flex: 1;
        .logo {
          @include child-center;
        }

        .description {
          font-size: $font-14px;
          .name-en {
            display: flex;
            .four {
              display: flex;
              font-size: 35.5px;
            }

            .zero-yun {
              .zero {
                padding-top: 3px;
              }
            }
          }
        }
      }
    }

    .data {
      display: flex;
      justify-content: space-around;
      padding: $outer-between*2 0;
      color: #3C1642;
      &>div {
        @include child-center;
        flex-direction: column;

        .value {
          font-size: 72px;
          .small {
            font-size: $font-14px;
          }
        }
      }
    }

    .container {
      column-count: 3;
      color: $color-theme;
      animation: container-ani 2s ease-out;
      h2 {
        column-span: 1;
        padding-bottom: $inner-between;
      }
      section {
        text-indent: 2rem;

        #ying {
          width: 50px;
          height: auto;
          float: left;
          shape-outside: inset(12px 0 -25px round 50%);
          margin-left: 0;
        }
      }
    }

  }

  @media screen and (max-width: 768px){
    .logo {
      max-width: 230px;
      min-width: 100px;
      width: 50%;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  @keyframes header-ani {
    0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes container-ani {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
