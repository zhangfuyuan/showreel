/**
 * Created by Jeffrey on 2018/1/23.
 */

Date.prototype.format = function(fmt) { //author: meizz
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

let myTools = {
  // 弹幕插件
  Danmaku: {
    /**
     *  domDanmaku
     *  videoId
     *  danmakuData
     *  videoWidth
     *  videoHeigth
     *  colors
     * */
    init(option){
      if(!option || !option.domDanmaku) return alert('Danmaku 插件参数出错！');

      this.domDanmaku = option.domDanmaku;
      this.videoId = option.videoId;
      this.danmakuData = option.danmakuData || [ { text: '这是默认的弹幕！', time: 0 } ];
      this.videoWidth = option.videoWidth || 300;
      this.videoHeigth = option.videoHeigth || 150;
      this.colors = option.colors || [ '#fff', '#FF0000', '#1E87F0', '#7AC84B', '#FF7F00', '#9B39F4', '#FF69B4' ];
      this.timer = null;

      this.removeAllDanmaku();
      this.pushDanmakuOfCurtime(0);
    },
    /**
     *  videoId
     *  danmakuData
     *  videoWidth
     * */
    updateInit(option){
      this.removeAllDanmaku();

      if(!option) return alert('Danmaku 插件参数出错！');

      this.videoId = option.videoId;

      if (option.danmakuData) this.danmakuData = option.danmakuData;
      if (option.videoWidth) this.videoWidth = option.videoWidth;

      this.pushDanmakuOfCurtime(0);
    },
    /**
     *  time
     * */
    pushDanmakuOfCurtime(time){
      let curDanmakuData = this.danmakuData.filter((data)=>{
        return data.time === time;
      });

      for (let i=0; i<curDanmakuData.length; i++) {
        let oSpan = document.createElement('span');
        oSpan.style.width = 'auto';
        oSpan.style.height = '1rem';
        oSpan.style.fontSize = '1rem';
        oSpan.style.lineHeight = '1rem';
        oSpan.style.whiteSpace = 'nowrap';
        oSpan.style.position = 'absolute';
        oSpan.style.left = this.videoWidth +'px';
        oSpan.style.top = curDanmakuData[i].top +'px';
        oSpan.style.color = this.colors[Math.floor(Math.random()*this.colors.length)];
        oSpan.innerHTML = curDanmakuData[i].text;
        this.domDanmaku.appendChild(oSpan);
      }
    },
    /**
     *  domInput
     *  curTime
     * */
    addDanmaku(option){
      if(!option || !option.domInput) return alert('Danmaku 插件参数出错！');

      this.stop();

      this.domInput = option.domInput;
      this.curTime = option.curTime || 0;

      let maxLine = Math.floor(this.videoHeigth / 24);
      let top = 10 + 24 * (parseInt(Math.random() * (maxLine - 1)));
      let oSpan = document.createElement('span');
      let text = this.domInput.value;

      this.domInput.value = '';
      oSpan.style.width = 'auto';
      oSpan.style.height = '1rem';
      oSpan.style.fontSize = '1rem';
      oSpan.style.lineHeight = '1rem';
      oSpan.style.whiteSpace = 'nowrap';
      oSpan.style.position = 'absolute';
      oSpan.style.left = this.videoWidth +'px';
      oSpan.style.top = top +'px';
      oSpan.style.color = this.colors[Math.floor(Math.random()*this.colors.length)];
      oSpan.innerHTML = text;
      this.domDanmaku.appendChild(oSpan);

      this.danmakuData.push({
        text: text,
        time: this.curTime,
        top: top
      });
      localStorage.setItem("danmakuData"+this.videoId, JSON.stringify(this.danmakuData));
    },
    removeAllDanmaku(){
      this.stop();

      let allSpan = this.domDanmaku.getElementsByTagName('span');//存储每个span元素

      for(let i=0; i<allSpan.length; i++){
        this.domDanmaku.removeChild(this.domDanmaku.childNodes[i]);
      }
    },
    move(){
      this.stop();
      this.timer = setInterval(()=>{
        let spanLefts= [];//存储每个span当前的left值
        let allSpan = this.domDanmaku.getElementsByTagName('span');//存储每个span元素

        for(let i=0; i<allSpan.length; i++){
          spanLefts.push(allSpan[i].offsetLeft);
          spanLefts[i] -= 2;
          allSpan[i].style.left = spanLefts[i] + 'px';
          if (spanLefts[i] < -allSpan[i].offsetWidth) {
            this.domDanmaku.removeChild(this.domDanmaku.childNodes[i]);
          }
        }
      }, 20);
    },
    stop(){
      clearInterval(this.timer);
      this.timer= null;
    }
  },
  time: {
    /**
     * 获取当前时间 padStart()需要较高版本的浏览器才支持！
     * 2017-08-11 22:52:13 星期六
     * @param  {Boolean} hasDay  是否需要年月日
     * @param  {Boolean} hasHour 是否需要十分秒
     * @param  {Boolean} hasWeek 是否需要星期
     * @param  {String} sign1 分隔符
     * @param  {String} sign2 分隔符
     */
    getNowDate (hasDay = true, hasHour = true, hasWeek = true, sign1 = '-', sign2 = ':') {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = (date.getDate()).toString().padStart(2, '0');
      let hour = (date.getHours()).toString().padStart(2, '0');
      let minutes = (date.getMinutes()).toString().padStart(2, '0');
      let seconds = (date.getSeconds()).toString().padStart(2, '0');
      let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
      let week = weekArr[date.getDay()];

      let time1 = hasDay ? `${year}${sign1}${month}${sign1}${day}` : '';
      let time2 = hasHour ? `${hour}${sign2}${minutes}` : '';
      let time3 = hasWeek ? `${week}` : '';

      return `${time1} ${time2} ${time3}`.replace(/(^\s*)|(\s*$)/g, '');
    }
  },
  str: {
    trim (str, type = 1) {
      switch (type) {
        case 1:
          return str.replace(/(^\s*)|(\s*$)/g, '');
        case 2:
          return str.replace(/\s+/g, '');
        case 3:
          return str.replace(/(^\s*)/g, '');
        case 4:
          return str.replace(/(\s*$)/g, '');
        default:
          return str
      }
    }
  },
  others: {
    /**
     * 获取浏览器信息
     * @return {string} 浏览器名称
     */
    whatBrowser () {
      let BrowserAgent = navigator.userAgent; // 返回由客户机发送服务器的 user-agent 头部的值。
      // let BrowserName = navigator.appName // 返回浏览器的名称。
      // let BrowserCode = navigator.appCodeName // 返回浏览器的代码名。
      // let BrowserVersion = navigator.appVersion // 返回浏览器的平台和版本信息。
      // let BrowserCookie = navigator.cookieEnabled // 返回指明浏览器中是否启用 cookie 的布尔值。
      // let BrowserOnline = navigator.onLine //返回指明系统是否处于脱机模式的布尔值。
      // let BrowserPlatform = navigator.platform // 返回运行浏览器的操作系统平台。
      // let BrowserLanguage = navigator.language // 返回 OS 的自然语言设置。

      let browser = 'Failed to identify the browser';

      if (BrowserAgent.indexOf('Firefox') > -1) {
        browser = 'Firefox';
      } else if (BrowserAgent.indexOf('Edge') > -1) {
        browser = 'Edge';
      } else if (BrowserAgent.indexOf('Chrome') > -1) {
        browser = 'Chrome';
      } else if (BrowserAgent.indexOf('MSIE') > -1 && BrowserAgent.indexOf('Trident') > -1) {
        browser = 'IE(8-10)';
      }

      return browser
    }
  }
};

export default myTools;
