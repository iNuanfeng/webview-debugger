import util from './util';

const divHtml = `
  <div id="debug-box" style="font-size:16px;display:block;position:fixed;left:10px;bottom:10px;background:rgba(255,255,255,0.6);z-index:9999;">
    <span id="debug-hide">关闭</span>
    <span id="debug-http-btn">HTTP打开</span>
    <span id="debug-zengzhi-btn">增值打开</span>
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
    
    // vconsole load
    util.appendScript('//yun.tuisnake.com/h5-mami/lib/vconsole.min.js', function() {
      new VConsole();
    })

    this.bindEvents();
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

    document.getElementById('debug-zengzhi-btn').addEventListener('click', () => {
      if (window.location.href.indexOf('?') !== -1) {
        window.location.href = window.location.href + '&test=true';
      } else {
        window.location.href = window.location.href + '?test=true';
      }
    })
  }
}

export default container;