import Cookies from 'js-cookie'
import control from './control';
import container from './container';

control(container.show.bind(container));

if (Cookies.get('webview-debugger') === 'true') {
  container.show();
}