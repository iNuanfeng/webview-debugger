import Cookies from 'js-cookie'
import control from './control';
import container from './container';
import qs from 'qs'
import '@lib/vant/lib/index.css';

console.log('webview debugger version: 1.0.4')

control(container.show.bind(container));

const searchURL = window.location.search
const paramsURL = searchURL.substr(1, searchURL.length - 1)
const isDebuggerOpen = qs.parse(paramsURL).debugger === 'true'

if (Cookies.get('webview-debugger') === 'true' || isDebuggerOpen) {
  container.show();
}