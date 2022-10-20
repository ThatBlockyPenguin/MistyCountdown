const url = 'https://api.countapi.xyz/info/mistycountdown.blockypenguin.com/visits'

document.getElementById('message').innerText = 'This site has had';

function cb(response) {
  document.getElementById('data').innerText = `${response.value} visits!`;
}