const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
const mistyOpens = Date.now() + (7 * 1000)//new Date("October 21 2022 20:00:00 GMT+0000").getTime();

const counter = document.getElementById('counter');
const message = document.getElementById('message');

const humanizer = humanizeDuration.humanizer({
  language: userLocale.split('-')[0],
  fallbacks: ['en'],
  round: true
});

let counterPrepend = '';
let counterAppend = '';
let hasCelebrated = false;

if (Date.now() > mistyOpens) {
  mistyOpen();
} else
  message.innerText = 'Until MistyLands re-opens!';

setInterval(async () => {
  const now = Date.now();
  let timeLeft = mistyOpens - now;

  if (timeLeft <= 0 && !hasCelebrated) {
    mistyOpen();
    hasCelebrated = true;
  }

  counter.innerText = counterPrepend + humanizer(timeLeft) + counterAppend;
}, 100);

function mistyOpen() {
  document.body.style.flexFlow = 'column-reverse wrap';
  message.innerHTML = 'MistyLands is open!';
  message.classList.add('maintext');
  message.classList.remove('subtext');

  counter.classList.add('subtext');
  counter.classList.remove('maintext');

  counterPrepend = 'MistyLands 1.19 has been open for ';
  counterAppend = '!';

  confetti.start();
}