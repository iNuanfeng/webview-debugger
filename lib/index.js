import control from './control';
import container from './container';

control(container.show.bind(container));

if (window.location.href.indexOf('vconsole=true') !== -1) {
  container.showVconsole();
}