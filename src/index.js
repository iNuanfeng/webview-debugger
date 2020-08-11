import Cookies from 'js-cookie'
import control from './control';
import container from './container';

console.log('webview debugger version: 1.0.1')

control(container.show.bind(container));

if (Cookies.get('webview-debugger') === 'true') {
  container.show();
}