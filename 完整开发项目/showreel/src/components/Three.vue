<template>
  <!--页面类别-->
  <div class="three">
    <!--各个组件-->
    <div class="wrapper">
      <el-container>
        <el-header>留言板</el-header>

        <el-main>
          <div class="leave">
            <div class="list">
              <div v-if="leaveList.length>0">
                <el-row class="card">
                  <el-col :span="4"
                          v-for="(item, index) in curLeaveList"
                          :key="index"
                          :offset="index > 0 ? 1 : 0"
                          :class="[ 'card-ani', 'card'+(index+1) ]">
                    <el-card :body-style="{ padding: '7px' }">
                      <div class="header">
                        <div class="face">
                          <img src="../assets/images/face.png">
                        </div>

                        <div class="info">
                          <div class="name">{{ item.name }}</div>

                          <div class="time">{{ item.time }}</div>
                        </div>
                      </div>

                      <p class="cont">
                        {{ item.cont }}
                      </p>
                    </el-card>
                  </el-col>
                </el-row>

                <p class="more" @click="changeCard" v-if="!isNoMore">
                  <el-badge value="new">查看更多留言...</el-badge>
                </p>

                <p class="noMore" v-else>到底了！</p>
              </div>

              <p class="nullList" v-else>暂无留言！</p>
            </div>

            <el-form id="form"
                     class="form"
                     status-icon
                     :rules="rules"
                     ref="form"
                     :model="form"
                     :inline="true"
                     size="medium"
                     :inline-message="true">
              <div class="inline">
                <el-form-item class="name" prop="name">
                  <span slot="label">昵称：</span>
                  <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item class="submit">
                  <el-button class="sent-btn" type="info" @click="onSubmit">立即留言</el-button>
                </el-form-item>
              </div>

              <el-form-item class="cont el-reset" prop="cont">
                <span slot="label">内容：</span>
                <el-input type="textarea" v-model="form.cont"></el-input>
              </el-form-item>

              <p class="mail">也可以发邮件至 <span class="line">799537951@qq.com</span> 联系我！</p>
            </el-form>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import '@/assets/scss/el-reset.css'
  import myTools from '@/assets/js/myTools'

  export default {
    name: 'three',
    data () {
      let validateName = (rule, value, callback) => {
        let val = myTools.str.trim(value);

        if (!val) {
          return callback(new Error('昵称不能为空'));
        }
        setTimeout(() => {
          if (val.length<3 || val.length>9) {
            callback(new Error('输入内容的长度在3～9之间'));
          } else {
            callback();
          }
        }, 500);
      };

      let validateCont = (rule, value, callback) => {
        let val = myTools.str.trim(value);

        if (!val) {
          return callback(new Error('内容不能为空'));
        }
        setTimeout(() => {
          if (/javascript/ig.test(val)) {
            callback(new Error('非法输入！'));
          } else {
            callback();
          }
        }, 500);
      };

      return {
        leaveList: [],
        form: {
          name: '',
          cont: ''
        },
        curCardIndex: 0,
        rules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          cont: [
            { validator: validateCont, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      curLeaveList(){
        return this.leaveList.filter((item, index)=>{
          return 5*this.curCardIndex <= index && index < 5*(this.curCardIndex+1);
        });
      },
      isNoMore(){
        return this.leaveList.length === (5*this.curCardIndex+this.curLeaveList.length);
      }
    },
    created () {},
    mounted () {
      this.leaveList = localStorage["leaveList"] ? JSON.parse(localStorage["leaveList"]) : [
        {
          name: 'author',
          cont: '由于时间比较赶，网页很多东西都没有完善好，希望大家能过过小瘾就好了，谢谢！',
          time: '2018-01-25 15:12'
        }, {
          name: '路人甲',
          cont: '测试内容1',
          time: '2017-01-01 00:00'
        }, {
          name: '路人乙',
          cont: '测试内容2',
          time: '2017-01-01 00:00'
        }, {
          name: '路人丙',
          cont: '测试内容3',
          time: '2017-01-01 00:00'
        }
      ];

      document.querySelector('#form').addEventListener('keydown', (evt)=>{
        let event = evt || window.event;

        if(event.keyCode === 13) event.preventDefault();
      });
    },//dom对象挂载完成后，可ajax初始化数据（仅执行一次）
    methods: {
      changeCard(){
        this.curCardIndex++;
      },
      onSubmit(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.leaveList.push({
              name: this.form.name,
              cont: this.form.cont,
              time: (new Date()).format('yyyy-MM-dd hh:mm')
            });
            this.$notify({
              title: '成功',
              message: '成功地在这里留下了您的足迹！请骚等...',
              type: 'success'
            });
            localStorage.setItem("leaveList", JSON.stringify(this.leaveList));
          } else {
            this.$notify.error({
              title: '错误',
              message: '提交失败，请按要求填写内容！'
            });
            return false;
          }
        });
      }
    },
    props: {},
    watch: {},
    filters: {},//filterFun: value => {  return value  }  -> {{ msg | filterFun }}
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .three {
    .wrapper {
      width: 80%;
      margin: 10vh auto;
      height: 100%;
      height: 80vh;
      background: url(../assets/images/p3_bg.png) center no-repeat;
      background-size: cover;
      border-radius: 20px;
      animation: box-ani 1s ease-out;
      .el-container {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 20px;
        .el-header {
          color: #fff;
          text-align: center;
          line-height: 60px;
          font-size: $font-24px;
          border-bottom: 1px solid #fff;
        }

        .el-main {
          width: 80%;
          margin: 0 auto;
          overflow-x: hidden;
          overflow-y: auto;
          .leave {
            .list {
              .card {
                .card-ani {
                  opacity: 0;
                  animation: card-ani 1s ease-out;
                  animation-fill-mode: forwards;

                  .el-card {
                    transition: all .25s linear;
                    background: repeating-linear-gradient(-45deg, #fff, #fff 15px, rgba(255, 255, 255, .5) 0, rgba(255, 255, 255, .5) 30px);
                    &:hover {
                      background: none;
                      background-color: $color-theme;
                      .name, .time, .cont {
                        color: #fff!important;
                      }
                    }

                    .header {
                      display: flex;
                      align-items: flex-end;
                      justify-content: space-between;
                      .face {
                        flex: 3;
                        img {
                          width: 100%;
                        }
                      }

                      .info {
                        flex: 7;
                        padding-left: $inner-between/2;
                        padding-bottom: 2px;
                        .name {
                          font-size: $font-12px;
                          color: $color-n-font;
                          margin-bottom: $inner-between/2;
                        }

                        .time {
                          font-size: 9px;
                          color: $color-l-font;
                        }
                      }
                    }

                    .cont {
                      @include ellipsis(8);
                      padding-top: 5px;
                      height: 170px;
                      text-indent: 2rem;
                      font-size: $font-14px;
                      line-height: 1.55;
                      color: $color-d-font;
                    }

                    @-moz-document url-prefix(){
                      .cont{
                        height: 150px!important;
                      }
                    }
                  }
                }

                .card1 {
                  animation-delay: 1s;
                }

                .card2 {
                  animation-delay: 1.25s;
                }

                .card3 {
                  animation-delay: 1.5s;
                }

                .card4 {
                  animation-delay: 1.75s;
                }

                .card5 {
                  animation-delay: 2s;
                }
              }

              .more, .noMore, .nullList {
                @include onepx-y('bottom', #fff);
                margin: $outer-between 0;
                height: 1.5rem;
                font-size: $font-12px;
                line-height: 1.5rem;
                text-align: center;
                color: $color-d-font;
                background-color: rgba(255, 255, 255, .5);
                opacity: 0;
              }

              .more, .noMore {
                animation: tip-ani 1s ease-out 2.25s;
                animation-fill-mode: forwards;
              }

              .more {
                cursor: pointer;
              }

              .nullList {
                animation: tip-ani 1s ease-out 1s;
                animation-fill-mode: forwards;
              }
            }

            .form {
              padding-top: $inner-between;
              animation: form-ani 1s ease-out 2.5s;
              opacity: 0;
              animation-fill-mode: forwards;
              .inline {
                @include child-center('y');
                .name {
                  flex: 1;
                  span {
                    color: #fff;
                  }
                }

                .submit {
                  .sent-btn {
                    background-color: rgba(71, 45, 48, .8);
                    border-color: $color-theme;
                  }
                }
              }

              .cont {
                span {
                  color: #fff;
                }
              }

              .el-form-item {
                margin-right: 0;
                margin-bottom: $inner-between;
              }

              .mail {
                color: $color-l-font;
                font-size: $font-12px;
                .line {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes box-ani {
    0% {
      opacity: 0;
      transform: scale(.5) rotate(0deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(720deg);
    }
  }

  @keyframes card-ani {
    0% {
      opacity: 0;
      transform: translate(50px, -100px);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes tip-ani {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes form-ani {
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
