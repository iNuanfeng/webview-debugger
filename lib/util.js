export default {
  appendScript(scriptURL, callback) {
    var script = document.createElement('script');
    script.src = scriptURL;
    script.onload = script.onreadystatechange = function () {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        callback();
        script.onload = script.onreadystatechange = null;
      }
    };
    document.head && document.head.appendChild(script);
  }
}