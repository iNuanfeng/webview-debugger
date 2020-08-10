import util from './util';

const divHtml = `
  <div id="debug-box" style="font-size:16px;display:block;position:fixed;left:10px;bottom:10px;background:rgba(255,255,255,0.6);z-index:9999;">
    <div>
      <span id="debug-hide">关闭</span>
      <span id="debug-http-btn"> HTTP打开</span>
      <span id="debug-ops-btn"> ops活动</span>
    </div>
    <div>
      <span id="debug-zengzhi-btn"> 增值打开</span>
      <span id="debug-vconsole-btn"> 调试打开</span>
    </div>
    <span id="debug-jump-btn" style="display: none;">跳转页面</span>
    <div id="debug-jump-box" style="display: none;">
      <input type="text" value="" id="debug-jump-ipt" />
      <button id="debug-jump-go" />
    </div>
  </div>
`

const container = {
  show() {
    if (this.hasShown()) {
      document.getElementById('debug-box').style.display = 'block';
      document.getElementById('__vconsole').style.display = 'block';
      return;
    }

    let div = document.createElement('div');
    div.innerHTML = divHtml;
    document.body.appendChild(div);
    
    this.showVconsole();

    this.bindEvents();
  },
  showVconsole() {
    // vconsole load
    util.appendScript('//yun.tuisnake.com/h5-mami/lib/vconsole.min.js', function() {
      new VConsole();
    })
  },
  hide() {
    document.getElementById('debug-box').style.display = 'none';
    document.getElementById('__vconsole').style.display = 'none';
  },
  hasShown() {
    const box = document.getElementById('debug-box');
    if (box) {
      return true;
    } else {
      return false;
    }
  },
  bindEvents() {
    document.getElementById('debug-hide').addEventListener('click', () => {
      this.hide();
    })

    document.getElementById('debug-http-btn').addEventListener('click', () => {
      window.location.protocol = 'http';
    })

    document.getElementById('debug-ops-btn').addEventListener('click', () => {
      window.location.href = 'https://activity.tuiatest.cn/activity/index?id=6722&login=preview&appKey=jlg88lyxz7siqtmr';
    })

    document.getElementById('debug-zengzhi-btn').addEventListener('click', () => {
      if (window.location.href.indexOf('?') !== -1) {
        window.location.href = window.location.href + '&test=true';
      } else {
        window.location.href = window.location.href + '?test=true';
      }
    })

    document.getElementById('debug-vconsole-btn').addEventListener('click', () => {
      if (window.location.href.indexOf('?') !== -1) {
        window.location.href = window.location.href + '&vconsole=true';
      } else {
        window.location.href = window.location.href + '?vconsole=true';
      }
    })
  }
}

export default container;