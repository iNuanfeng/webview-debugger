export default function (showDebugger) {
  const TOTAL = 10;
  const MAX_TIME = 3000;
  let timer = null;
  let count = 0;
  document.addEventListener('click', (event) => {
    const e = event || window.event;
    
    if (e.clientX > 100 || e.clientY > 100) {
      return;
    }

    if (count === 0) {
      timer = setTimeout(() => {
        count = 0;
      }, MAX_TIME)
    }

    count++;

    if (count === TOTAL) {
      count = 0;
      window.clearTimeout(timer);
      showDebugger();
    }
  })
}