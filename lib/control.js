const TOTAL = 10;
const MAX_TIME = 3000;
let timer = null;
let count = 0;
window.addEventListener('click', (event) => {
  const e = event || window.event;
  console.log({'x':e.screenX,'y':e.screenY});

  if (count === 0) {
    timer = setTimeout(() => {
      count = 0;
      console.log('to 0')
    }, MAX_TIME)
  }

  count++;

  if (count === TOTAL) {
    count = 0;
    window.clearTimeout(timer);
    console.log('show debugger');
  }
})

