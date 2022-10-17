const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
const mistyOpens = Date.now() + (7 * 1000)//new Date("October 21 2022 20:00:00 GMT+0000").getTime();

const counter = document.getElementById('counter');
const message = document.getElementById('message');

const hexChars = '0123456789ABCDEF';

const humanizer = humanizeDuration.humanizer({
  language: userLocale.split('-')[0],
  fallbacks: ['en'],
  round: true
});

let counterPrepend = '';
let counterAppend = '';
let hasCelebrated = false;

let colourScale1;
let colourScale2;

if (Date.now() < mistyOpens)
  message.innerText = 'Until MistyLands re-opens!';

setInterval(() => {
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

  generateTargetColours();
    
  let i = 0;
  
  setInterval(() => {
    setColours(colourScale1(i), colourScale2(i));
    
    i += 0.1;
    
    if(i >= 1) {
      i = 0;
      generateTargetColours();
    }
  }, 50);
}

function generateTargetColours() {
  const colour = generateColour();
  colourScale1 = color2k.getScale(getComputedStyle(document.body).getPropertyValue('--next-gradient-colour-1').trim(), colour);
  colourScale2 = color2k.getScale(getComputedStyle(document.body).getPropertyValue('--next-gradient-colour-2').trim(), getComplementaryColour(colour));
}

function generateColour() {
  let color = '#';
  
  for(var i = 0; i < 6; i++)
    color += hexChars[Math.floor(Math.random() * 16)];
  
  return color;
}

// Thanks, StackOverflow! https://stackoverflow.com/questions/40061256/javascript-complementary-colors
function getComplementaryColour(colour) {
  const c = colour.slice(1);
  const i = parseInt(c, 16);
  let v = ((1 << 4 * c.length) - 1 - i).toString(16);

  while(v.length < c.length)
    v = '0' + v;
  
  return '#' + v;
}

function setColours(colour1, colour2) {
  document.body.style.setProperty('--next-gradient-colour-1', colour1);
  document.body.style.setProperty('--next-gradient-colour-2', colour2);
}