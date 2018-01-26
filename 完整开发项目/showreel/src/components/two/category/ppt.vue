<template>
  <!--页面类别-->
  <div class="ppt">
    <!--各个组件-->
    <div class="info">
      <ul>
        <li><span class="txt">发布时间：</span>{{ info.publishTime }}</li>
        <li class="step">|</li>
        <li><span class="txt">所属分类：</span>{{ info.category }}</li>
        <li class="step">|</li>
        <li><span class="txt">浏览人数：</span>{{ info.views }}</li>
        <li class="step">|</li>
        <li><span class="txt">综合评分：</span>{{ info.averageMark }}</li>
      </ul>
    </div>

    <div class="ctrl">
      <div class="page">
        <el-button-group>
          <el-button size="mini"
                     type="info"
                     icon="el-icon-arrow-left"
                     round @click="onPrevPage"
                     :disabled="isPrevDisabled">上一页</el-button>
          <el-button size="mini"
                     type="info"
                     round
                     @click="onNextPage"
                     :disabled="isNextDisabled">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>

        &nbsp; &nbsp;

        <span class="txt">页数：<span class="num">{{ pageNum }}</span> / {{ pageCount }}</span>
      </div>

      <el-rate class="mark"
               v-model="markValue"
               show-score
               :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
               text-color="#ff9900"
               score-template="{value}"
               @change="changeMark">
      </el-rate>
    </div>

    <div class="canvas-wrapper">
      <canvas id="theCanvas"></canvas>
    </div>
  </div>
</template>

<script>
  import pdfjsLib from 'pdfjs-dist'

  export default {
    name: 'ppt',
    data () {
      return {
        info: this.workInfo || {
          workTitle: '*',
          fileName: 'ppt_01.pdf',
          publishTime: '*',
          category: '*',
          views: 0,
          averageMark: 0,
          markPeople: 0,
          pptWidth: 720
        },
        domCanvas: null,
        markValue: null,
        pdfDoc: null,
        pageNum: 1,
        pageRendering: false,
        pageNumPengding: null,
        pageCount: 0,
        isLoading: false
      }
    },
    computed: {
      pdfPath(){
        return 'static/resouces/' + this.info.fileName;
      },
      pdfWidth(){
        return this.isFullScreen ? this.$store.getters.twoPdfFsWidth : this.$store.getters.twoPdfWidth;
      },
      isPrevDisabled(){
        return this.pageNum === 1;
      },
      isNextDisabled(){
        return this.pageNum === this.pageCount;
      }
    },
    created () {
      this.info.views++;
    },
    mounted () {
      pdfjsLib.PDFJS.workerSrc = 'static/js/pdf.worker.js';
      this.domCanvas = document.getElementById('theCanvas');
      this.loadingPdf();
    },
    methods: {
      loadingPdf(){
        let loadingTask = pdfjsLib.getDocument(this.pdfPath);

        loadingTask.promise.then((pdfDocument)=>{
          this.pdfDoc = pdfDocument;
          this.pageCount = this.pdfDoc.numPages;
          this.renderPage(this.pageNum);
        }).catch((reason)=>{
          console.error('Error: ' + reason);
        });
      },
      renderPage(num){
        this.pageRendering = true;
        this.pdfDoc.getPage(num).then((pdfPage)=>{
          let scale = Math.floor(this.pdfWidth/this.info.pptWidth*100)/100;
          let viewport = pdfPage.getViewport(scale);
          this.domCanvas.width = viewport.width;
          this.domCanvas.height = viewport.height;
          let ctx = this.domCanvas.getContext('2d');
          let renderTask = pdfPage.render({
            canvasContext: ctx,
            viewport: viewport
          });

          renderTask.promise.then(()=>{
            this.pageRendering = false;

            if(this.pageNumPengding !== null){
              this.renderPage(this.pageNumPengding);
              this.pageNumPengding = null;
            }
          });
        });
      },
      queueRenderPage() {
        if(this.pageRendering){
          this.pageNumPengding = this.pageNum;
        }else {
          this.renderPage(this.pageNum);
        }
      },
      onPrevPage(){
        if(this.pageNum <= 1) return;

        this.pageNum--;
        this.queueRenderPage(this.pageNum);
        this.isLoading = true;
      },
      onNextPage(){
        if(this.pageNum >= this.pageCount) return;

        this.pageNum++;
        this.queueRenderPage(this.pageNum);
        this.isLoading = true;
      },
      changeMark(val){
        this.info.averageMark = Math.round((this.info.averageMark*this.info.markPeople+val)/(this.info.markPeople+1)*10)/10;
        this.info.markPeople++;
        this.info.markValue = val;
      }
    },
    props: [ 'workInfo', 'isFullScreen' ],
    watch: {
      workInfo(info){
        if (!info) return;

        this.info = info;
        this.info.views++;
        this.markValue = this.info.markValue || 0;
        this.pdfDoc = null;
        this.pageNum = 1;
        this.loadingPdf();
      },
      pageRendering(val){
        this.$emit('input', val);
      },
      isFullScreen(val){
        this.loadingPdf();
      }
    },
    filters: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .ppt {
    .info {
      color: #fff;
      opacity: .95;
      font-size: $font-14px;
      ul {
        @include child-center('y');
        justify-content: space-between;
        li {
          .txt {
            color: $color-ml-font;
          }
        }

        .step {
          color: $color-n-font;
        }
      }
    }

    .ctrl {
      padding-top: $inner-between;
      color: #fff;
      opacity: .95;
      @include child-center('y');
      .page {
        flex: 1;
        .txt {
          color: $color-l-font;
          .num {
            color: #fff;
            opacity: .95;
          }
        }
      }
    }

    .canvas-wrapper {
      border: 9px solid transparent;
      background-clip: content-box;
      border-image: url(../../../assets/images/shadow.png) 9 9 repeat;
    }
  }
</style>
